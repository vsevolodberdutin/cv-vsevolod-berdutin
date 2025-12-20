'use client';

import React, { useRef, useEffect } from 'react';
import { Card, Spinner } from '@/shared/ui';
import { MessageCard } from '@/entities/message';
import { SendMessageForm, useSendMessage } from '@/features/send-message';
import { useChatStore } from '../model/useChatStore';

const SUGGESTED_PROMPTS = [
  "What projects have you led?",
  "Tell me about your AI integration work",
  "What's your experience with crypto/fintech?",
  "Describe your team leadership approach",
];

/**
 * Chat Widget
 * AI-powered chat interface for asking questions about professional experience
 */
export const ChatWidget: React.FC = () => {
  const { messages, addMessages } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { message, setMessage, sendMessage, isLoading, error } = useSendMessage({
    onMessageSent: (userMsg, assistantMsg) => {
      addMessages(userMsg, assistantMsg);
    },
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handlePromptClick = (prompt: string) => {
    setMessage(prompt);
  };

  return (
    <section className="py-8">
      <Card className="overflow-hidden">
        {/* Header */}
        <div className="bg-accent p-4 text-white">
          <h3 className="text-xl font-bold">Ask Me Anything</h3>
          <p className="text-sm opacity-90">
            Powered by AI - Ask about my experience and skills
          </p>
        </div>

        {/* Suggested Prompts (shown when no messages) */}
        {messages.length === 0 && (
          <div className="space-y-3 p-6">
            <p className="mb-3 text-sm text-text-secondary">
              Try asking:
            </p>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {SUGGESTED_PROMPTS.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handlePromptClick(prompt)}
                  className="rounded-lg border border-gray-300 p-3 text-left text-sm
                    transition duration-300
                    hover:border-accent hover:bg-background-secondary
                    focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                >
                  💬 {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="max-h-96 space-y-4 overflow-y-auto p-4">
          {messages.map((msg) => (
            <MessageCard key={msg.id} message={msg} />
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-center gap-2 text-text-secondary">
              <Spinner size="sm" />
              <span className="text-sm">Thinking...</span>
            </div>
          )}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <SendMessageForm
          message={message}
          setMessage={setMessage}
          onSubmit={sendMessage}
          isLoading={isLoading}
          history={messages}
          error={error}
        />
      </Card>
    </section>
  );
};

ChatWidget.displayName = 'ChatWidget';
