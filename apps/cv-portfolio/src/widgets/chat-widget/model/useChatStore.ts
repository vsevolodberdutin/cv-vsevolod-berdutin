import { create } from 'zustand';
import { Message } from '@/entities/message';

interface ChatStore {
  messages: Message[];
  isLoading: boolean;
  addMessage: (message: Message) => void;
  addMessages: (userMessage: Message, assistantMessage: Message) => void;
  setLoading: (isLoading: boolean) => void;
  clearMessages: () => void;
}

/**
 * Chat Store
 * Manages chat messages state using Zustand
 */
export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  isLoading: false,

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  addMessages: (userMessage, assistantMessage) =>
    set((state) => ({
      messages: [...state.messages, userMessage, assistantMessage],
    })),

  setLoading: (isLoading) => set({ isLoading }),

  clearMessages: () => set({ messages: [] }),
}));
