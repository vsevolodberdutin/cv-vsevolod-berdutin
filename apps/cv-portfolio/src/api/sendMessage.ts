import { Message } from '@/data/messageTypes';

/**
 * Send a message to the AI chat API
 * @param message - The user's message content
 * @param history - Previous conversation history
 * @returns The AI assistant's response
 */
export async function sendMessage(
  message: string,
  history: Message[]
): Promise<string> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      history: history.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || 'Failed to send message');
  }

  const data = await response.json();
  return data.reply;
}
