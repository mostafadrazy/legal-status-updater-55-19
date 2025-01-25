import { useState, useCallback } from 'react';
import { useChatHistory } from '@/contexts/ChatHistoryContext';
import { geminiHandler } from '@/api/gemini';
import { toast } from 'sonner';

export function useChatLogic() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { messages, addMessage } = useChatHistory();

  const handleSubmit = useCallback(async (
    e: React.FormEvent,
    searchEnabled: boolean,
    onSuccess?: () => void
  ) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      role: 'user' as const,
      content: input.trim(),
      timestamp: new Date().toISOString()
    };

    addMessage(userMessage);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Get all previous messages for context
      const previousMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const { response, searchResults } = await geminiHandler(userMessage.content, searchEnabled, previousMessages);

      const assistantMessage = {
        role: 'assistant' as const,
        content: response,
        timestamp: new Date().toISOString(),
        searchResults
      };

      addMessage(assistantMessage);
      onSuccess?.();
      
    } catch (error: any) {
      console.error('Error in handleSubmit:', error);
      
      const errorMessage = {
        role: 'assistant' as const,
        content: `عذراً، حدث خطأ: ${error.message}`,
        timestamp: new Date().toISOString()
      };
      
      addMessage(errorMessage);
      
      toast.error('عذراً، حدث خطأ أثناء معالجة طلبك', {
        description: error.message
      });
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  }, [input, addMessage, messages]);

  return {
    input,
    setInput,
    isLoading,
    isTyping,
    handleSubmit
  };
}