import React from 'react';
import { Message } from '@/data/messageTypes';
import { formatTime, cn } from 'ui_kit';

export interface MessageCardProps {
  message: Message;
}

export const MessageCard: React.FC<MessageCardProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex animate-fadeIn gap-3',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-lg',
          isUser
            ? 'bg-accent text-white'
            : 'border border-border bg-background-secondary text-text-primary'
        )}
      >
        {isUser ? '👤' : '🤖'}
      </div>

      {/* Message Content */}
      <div
        className={cn(
          'flex max-w-[75%] flex-col',
          isUser ? 'items-end' : 'items-start'
        )}
      >
        <div
          className={cn(
            'rounded-2xl px-4 py-3',
            isUser
              ? 'rounded-tr-sm bg-accent text-white'
              : 'rounded-tl-sm border border-border bg-background-secondary text-text-primary'
          )}
        >
          <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
            {message.content}
          </p>
        </div>

        {/* Timestamp */}
        <span className="mt-1 px-2 text-xs text-text-secondary">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
};

MessageCard.displayName = 'MessageCard';
