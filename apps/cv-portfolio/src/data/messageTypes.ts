/**
 * Message Types
 * Defines the structure for chat messages in the AI assistant
 */

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export type MessageRole = 'user' | 'assistant';
