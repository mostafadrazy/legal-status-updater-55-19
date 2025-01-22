import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Bot } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { supabase } from "@/integrations/supabase/client";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import TypingIndicator from "./TypingIndicator";
import Message from "./Message";
import ChatInput from "./ChatInput";

interface Message {
  role: 'assistant' | 'user';
  content: string;
  timestamp?: string;
}

interface UserProfile {
  full_name?: string | null;
  avatar_url?: string | null;
}

const BEARER_TOKEN = "drazzzy0823";

export function LegalAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const { session, user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    setSessionId(uuidv4());
    
    const fetchUserProfile = async () => {
      if (!user?.id) return;
      
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("full_name, avatar_url")
          .eq("id", user.id)
          .single();

        if (error) throw error;
        setUserProfile(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [user?.id]);

  const handleMicClick = () => {
    if (!browserSupportsSpeechRecognition) {
      toast.error("عذراً، متصفحك لا يدعم خاصية التحدث");
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
      setIsListening(false);
    } else {
      resetTranscript();
      setIsListening(true);
      SpeechRecognition.startListening({ continuous: true, language: 'ar-MA' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (listening) {
      SpeechRecognition.stopListening();
      setIsListening(false);
    }

    const userMessage = input.trim();
    setInput('');
    resetTranscript();
    
    const newUserMessage = { 
      role: 'user' as const, 
      content: userMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);
    setIsTyping(true);

    try {
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
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response || data.output || 'No response received',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('Error:', error);
      toast.error('عذراً، حدث خطأ أثناء معالجة طلبك', {
        id: 'error-toast',
      });
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-5xl mx-auto space-y-4 px-4" dir="rtl">
      <Card className="flex-1 bg-[#111]/90 border border-[#4CD6B4]/20 p-6 shadow-2xl backdrop-blur-xl rounded-2xl overflow-hidden flex flex-col">
        <ScrollArea className="flex-1 pl-4">
          <div className="space-y-6 min-h-full">
            {messages.map((message, index) => (
              <Message
                key={index}
                {...message}
                userProfile={userProfile}
              />
            ))}
            
            {isTyping && <TypingIndicator />}
            
            {messages.length === 0 && (
              <div className="text-center py-16 px-4">
                <div className="bg-gradient-to-br from-[#4CD6B4] to-[#2A9D8F] w-24 h-24 rounded-2xl mx-auto mb-8 flex items-center justify-center shadow-lg shadow-[#4CD6B4]/20 hover:shadow-[#4CD6B4]/30 transition-all duration-300 transform hover:scale-105">
                  <Bot className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">مرحباً بك في المستشار القانوني</h3>
                <p className="text-base text-[#4CD6B4]/80 max-w-lg mx-auto">
                  يمكنني مساعدتك في الأمور القانونية المتعلقة بالقانون المغربي. كيف يمكنني مساعدتك اليوم؟
                </p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </Card>

      <ChatInput
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        isListening={isListening}
        handleMicClick={handleMicClick}
      />
    </div>
  );
}