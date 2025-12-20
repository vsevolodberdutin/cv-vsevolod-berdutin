import { useState } from 'react';
import { sendMessage as apiSendMessage } from '../api/sendMessage';
import { Message } from '@/entities/message';

export interface UseSendMessageOptions {
  onMessageSent: (userMessage: Message, assistantMessage: Message) => void;
}

/**
 * Hook to manage sending messages to the AI chat
 * Handles form state, loading, and errors
 */
export function useSendMessage({ onMessageSent }: UseSendMessageOptions) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (
    e: React.FormEvent,
    history: Message[]
  ): Promise<void> => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message.trim(),
      timestamp: new Date(),
    };

    try {
      const reply = await apiSendMessage(message, history);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
        timestamp: new Date(),
      };

      onMessageSent(userMessage, assistantMessage);
      setMessage('');
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to send message. Please try again.';
      setError(errorMessage);
      console.error('Send message error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    message,
    setMessage,
    sendMessage,
    isLoading,
    error,
    clearError: () => setError(null),
  };
}
