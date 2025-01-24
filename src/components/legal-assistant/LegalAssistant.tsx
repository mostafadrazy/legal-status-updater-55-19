import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Bot, Globe } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { supabase } from "@/integrations/supabase/client";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import TypingIndicator from "./TypingIndicator";
import Message from "./Message";
import ChatInput from "./ChatInput";
import { searchHandler } from "@/api/search";
import { geminiHandler } from "@/api/gemini";

interface Message {
  role: 'assistant' | 'user';
  content: string;
  timestamp?: string;
  searchResults?: any[];
}

interface UserProfile {
  full_name?: string | null;
  avatar_url?: string | null;
}

export function LegalAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [searchEnabled, setSearchEnabled] = useState(false); // Search disabled by default
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
      // Get previous context if available
      const previousMessage = messages.length >= 2 ? {
        query: messages[messages.length - 2].content,
        answer: messages[messages.length - 1].content
      } : undefined;

      let response;
      const searchResults = searchEnabled ? await searchHandler(userMessage) : [];
      response = await geminiHandler(userMessage, searchResults, previousMessage);

      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
        searchResults: searchResults
      };
      setMessages(prev => [...prev, assistantMessage]);
      
    } catch (error: any) {
      console.error('Error in handleSubmit:', error);
      
      const errorMessage: Message = {
        role: 'assistant',
        content: `عذراً، حدث خطأ: ${error.message}`,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      toast.error('عذراً، حدث خطأ أثناء معالجة طلبك', {
        id: 'error-toast',
        description: error.message
      });
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <Card className="w-full h-full bg-[#1a1a1a] border-0 flex flex-col">
      <ScrollArea className="flex-1 px-4 py-6">
        <div className="space-y-6 max-w-4xl mx-auto">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-[#2A9D8F] flex items-center justify-center">
                <Bot className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">المستشار القانوني</h3>
              <p className="text-sm text-gray-400 max-w-md">
                مرحباً بك في المستشار القانوني. كيف يمكنني مساعدتك اليوم؟
              </p>
            </div>
          )}
          
          {messages.map((message, index) => (
            <Message
              key={index}
              role={message.role}
              content={message.content}
              timestamp={message.timestamp}
              searchResults={message.searchResults}
              userProfile={userProfile}
              isTyping={isTyping && index === messages.length - 1}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="flex-shrink-0 border-t border-[#2a2a2a] bg-[#1a1a1a] p-4">
        <div className="flex items-center justify-end mb-3 px-4">
          <button
            onClick={() => setSearchEnabled(!searchEnabled)}
            className={cn(
              "rounded-full transition-all flex items-center gap-2 px-3 py-2 border h-9",
              searchEnabled
                ? "bg-[#4CD6B4]/10 border-[#4CD6B4] text-[#4CD6B4]"
                : "bg-white/5 border-transparent text-white/40 hover:text-white"
            )}
          >
            <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
              <motion.div
                animate={{
                  rotate: searchEnabled ? 180 : 0,
                  scale: searchEnabled ? 1.1 : 1,
                }}
                whileHover={{
                  rotate: searchEnabled ? 180 : 15,
                  scale: 1.1,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 10,
                  },
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 25,
                }}
              >
                <Globe
                  className={cn(
                    "w-4 h-4",
                    searchEnabled
                      ? "text-[#4CD6B4]"
                      : "text-inherit"
                  )}
                />
              </motion.div>
            </div>
            <AnimatePresence>
              {searchEnabled && (
                <motion.span
                  initial={{ width: 0, opacity: 0 }}
                  animate={{
                    width: "auto",
                    opacity: 1,
                  }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm overflow-hidden whitespace-nowrap text-[#4CD6B4] flex-shrink-0"
                >
                  البحث + الذكاء الاصطناعي
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
        <ChatInput
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          isListening={isListening}
          handleMicClick={handleMicClick}
        />
      </div>
    </Card>
  );
}
