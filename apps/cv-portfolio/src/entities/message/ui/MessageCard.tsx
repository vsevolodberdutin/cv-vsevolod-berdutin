import React from 'react';
import { Message } from '../model/types';
import { formatTime } from '@/shared/lib/utils';
import { cn } from '@/shared/lib/utils';

export interface MessageCardProps {
  message: Message;
}

export const MessageCard: React.FC<MessageCardProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex gap-3 animate-fadeIn',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg',
          isUser
            ? 'bg-accent text-white'
            : 'bg-background-secondary text-text-primary border border-border'
        )}
      >
        {isUser ? '👤' : '🤖'}
      </div>

      {/* Message Content */}
      <div
        className={cn(
          'flex flex-col max-w-[75%]',
          isUser ? 'items-end' : 'items-start'
        )}
      >
        <div
          className={cn(
            'px-4 py-3 rounded-2xl',
            isUser
              ? 'bg-accent text-white rounded-tr-sm'
              : 'bg-background-secondary text-text-primary rounded-tl-sm border border-border'
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </p>
        </div>

        {/* Timestamp */}
        <span className="mt-1 text-xs text-text-secondary px-2">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
};

MessageCard.displayName = 'MessageCard';
