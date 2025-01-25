import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getOrCreateConversation, getConversationMessages, addMessage, deleteConversation } from '@/services/conversationService';

export interface Message {
  role: 'assistant' | 'user';
  content: string;
  timestamp: string;
  searchResults?: any;
}

interface ChatHistoryContextType {
  messages: Message[];
  addMessage: (message: Message) => Promise<void>;
  clearHistory: () => void;
  getLastMessages: (count: number) => Message[];
  isLoading: boolean;
  startNewChat: () => Promise<void>;
}

const ChatHistoryContext = createContext<ChatHistoryContextType | undefined>(undefined);

export function ChatHistoryProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const initializeConversation = async () => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }
    
    try {
      const convId = await getOrCreateConversation(user.id);
      setConversationId(convId);
      
      const dbMessages = await getConversationMessages(convId);
      setMessages(dbMessages.map(msg => ({
        role: msg.role as 'assistant' | 'user',
        content: msg.content,
        timestamp: msg.created_at,
        searchResults: msg.search_results
      })));
    } catch (error) {
      console.error('Error initializing conversation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializeConversation();
  }, [user?.id]);

  const addMessageToHistory = async (message: Message) => {
    if (!conversationId || !user?.id) return;

    try {
      await addMessage(
        conversationId,
        message.role,
        message.content,
        undefined,
        message.searchResults
      );
      
      setMessages(prev => [...prev, message]);
    } catch (error) {
      console.error('Error adding message:', error);
      throw error;
    }
  };

  const startNewChat = async () => {
    if (!user?.id) return;
    
    try {
      setIsLoading(true);
      
      // Delete old conversation if exists
      if (conversationId) {
        await deleteConversation(conversationId);
      }
      
      // Clear messages from state
      setMessages([]);
      
      // Create new conversation
      const newConvId = await getOrCreateConversation(user.id);
      setConversationId(newConvId);
    } catch (error) {
      console.error('Error starting new chat:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    setMessages([]);
  };

  const getLastMessages = (count: number) => {
    return messages.slice(-count);
  };

  return (
    <ChatHistoryContext.Provider value={{ 
      messages, 
      addMessage: addMessageToHistory, 
      clearHistory, 
      getLastMessages,
      isLoading,
      startNewChat
    }}>
      {children}
    </ChatHistoryContext.Provider>
  );
}

export function useChatHistory() {
  const context = useContext(ChatHistoryContext);
  if (context === undefined) {
    throw new Error('useChatHistory must be used within a ChatHistoryProvider');
  }
  return context;
}