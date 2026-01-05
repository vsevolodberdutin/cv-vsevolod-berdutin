import React, { useRef, useEffect } from 'react';
import { Button, cn } from 'ui_kit';
import { Message } from '@/data/messageTypes';

export interface SendMessageFormProps {
  message: string;
  setMessage: (message: string) => void;
  onSubmit: (e: React.FormEvent, history: Message[]) => void;
  isLoading: boolean;
  history: Message[];
  error?: string | null;
  className?: string;
}

export const SendMessageForm: React.FC<SendMessageFormProps> = ({
  message,
  setMessage,
  onSubmit,
  isLoading,
  history,
  error,
  className,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() && !isLoading) {
        onSubmit(e as any, history);
      }
    }
  };

  return (
    <form
      onSubmit={(e) => onSubmit(e, history)}
      className={cn('flex flex-col gap-2 border-t border-gray-200 p-4', className)}
    >
      {error && (
        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="flex gap-2">
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me about my experience..."
            disabled={isLoading}
            rows={1}
            className={cn(
              'w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3',
              'text-text-primary placeholder:text-text-secondary',
              'transition duration-200',
              'focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-background-secondary',
              'min-h-[48px] max-h-[120px]'
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading || !message.trim()}
          size="md"
          className="h-12 w-12 flex-shrink-0 p-0"
          aria-label="Send message"
        >
          {isLoading ? (
            <span className="animate-pulse">●●●</span>
          ) : (
            <span className="text-xl">➤</span>
          )}
        </Button>
      </div>

      <p className="text-xs text-text-secondary">
        Press Enter to send, Shift+Enter for new line
      </p>
    </form>
  );
};

SendMessageForm.displayName = 'SendMessageForm';
