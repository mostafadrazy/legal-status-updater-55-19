import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Bot, Send, User, Clock } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

interface Message {
  role: 'assistant' | 'user';
  content: string;
  timestamp?: string;
}

// Bearer token for n8n webhook authentication
const BEARER_TOKEN = "drazzzy0823";

export function LegalAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const { session } = useAuth();

  // Initialize session ID when component mounts
  useEffect(() => {
    setSessionId(uuidv4());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message to conversation
    const newUserMessage = { 
      role: 'user' as const, 
      content: userMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      // Create a new assistant message first
      const assistantMessage: Message = {
        role: 'assistant',
        content: '',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, assistantMessage]);

      // Call n8n webhook with bearer token and session ID
      const response = await fetch('https://kadiya.app.n8n.cloud/webhook/legal-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${BEARER_TOKEN}`
        },
        body: JSON.stringify({
          session_Id: sessionId,
          chatInput: userMessage
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from assistant');
      }

      const data = await response.json();
      
      // Update the assistant's message with the response
      setMessages(prev => {
        const updated = [...prev];
        const lastMessage = updated[updated.length - 1];
        if (lastMessage.role === 'assistant') {
          lastMessage.content = data.response || data.output || 'No response received';
        }
        return updated;
      });

    } catch (error) {
      console.error('Error:', error);
      toast.error('عذراً، حدث خطأ أثناء معالجة طلبك');
      setMessages(prev => {
        const updated = [...prev];
        const lastMessage = updated[updated.length - 1];
        if (lastMessage.role === 'assistant') {
          lastMessage.content = 'عذراً، حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.';
        }
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[80vh] max-w-4xl mx-auto p-4 space-y-4">
      <Card className="flex-1 bg-gradient-to-br from-[#111] to-[#1A1A1A] border border-white/10 p-4">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex flex-col gap-3 ${
                  message.role === 'assistant' ? 'bg-white/5' : 'bg-white/10'
                } rounded-lg p-4`}
              >
                <div className="flex items-start gap-3">
                  {message.role === 'assistant' ? (
                    <Bot className="w-6 h-6 text-[#4CD6B4] mt-1 flex-shrink-0" />
                  ) : (
                    <User className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/90 leading-relaxed whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                    
                    {message.timestamp && (
                      <div className="flex items-center gap-1 text-xs text-white/40 mt-2">
                        <Clock className="w-3 h-3" />
                        {new Date(message.timestamp).toLocaleString('ar-MA')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {messages.length === 0 && (
              <div className="text-center py-8 text-white/60">
                <Bot className="w-12 h-12 mx-auto mb-4 text-[#4CD6B4]" />
                <h3 className="text-lg font-semibold mb-2">مرحباً بك في المستشار القانوني</h3>
                <p className="text-sm">
                  يمكنني مساعدتك في الأمور القانونية المتعلقة بالقانون المغربي. كيف يمكنني مساعدتك اليوم؟
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </Card>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="اكتب سؤالك هنا..."
          className="flex-1 bg-white/5 border border-white/10 text-white/90"
          rows={3}
        />
        <Button 
          type="submit" 
          disabled={isLoading || !input.trim()}
          className="bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black self-end"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};