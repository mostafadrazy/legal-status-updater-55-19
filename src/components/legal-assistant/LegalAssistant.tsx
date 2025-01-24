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
  const [progress, setProgress] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simulate progress for long operations
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isLoading]);
  
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
    <Card
      aria-label="المستشار القانوني"
      role="region"
      className="w-full h-full bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#2a2a2a] border-0 flex flex-col overflow-hidden relative"
      style={{ minHeight: 'calc(100vh - 4rem)' }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ top: '15%', left: '20%' }} />
        <div className="absolute w-1 h-1 bg-[#4CD6B4]/30 rounded-full animate-pulse" style={{ top: '30%', left: '70%' }} />
      </div>

      {/* Header Section */}
      <div className="relative z-10 border-b border-white/10 bg-gradient-to-r from-[#1a1a1a]/80 to-[#2a2a2a]/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#4CD6B4] to-[#2A9D8F] flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-[#4CD6B4] border-2 border-[#1a1a1a] flex items-center justify-center">
                <span className="text-[8px] font-bold text-white">AI</span>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">المستشار القانوني</h2>
              <p className="text-xs text-[#4CD6B4] flex items-center gap-1">
                <span className="h-2 w-2 bg-[#4CD6B4] rounded-full animate-pulse"></span>
                جاهز للمساعدة
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-white/60">
              الجلسة: <span className="font-mono">#{sessionId.slice(0,6)}</span>
            </div>
          </div>
        </div>
      </div>
      <ScrollArea
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        aria-atomic="false"
        className="flex-1 px-6 py-8"
      >
        <div role="list" className="space-y-6 max-w-4xl mx-auto">
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
            <motion.div
              role="listitem"
              aria-posinset={index + 1}
              aria-setsize={messages.length}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "w-full",
                message.role === 'assistant' ? 'pr-10' : 'pl-10'
              )}
            >
              <Message
                key={index}
                messageRole={message.role}
                content={message.content}
                timestamp={message.timestamp}
                searchResults={message.searchResults}
                userProfile={userProfile}
                isTyping={isTyping && index === messages.length - 1}
                className={cn(
                  "px-4 py-3",
                  message.role === 'assistant'
                    ? 'text-gray-800'
                    : 'text-gray-800'
                )}
              />
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
          {isLoading && (
            <div className="w-full max-w-4xl mx-auto mt-6">
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#4CD6B4] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-2 text-xs text-[#4CD6B4] text-center">
                جاري معالجة طلبك...
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="flex-shrink-0 border-t border-white/10 bg-gradient-to-r from-[#1a1a1a]/90 to-[#2a2a2a]/90 backdrop-blur-lg px-6 py-8">
        <div className="flex items-center justify-end mb-3 px-4">
          <button
            onClick={() => setSearchEnabled(!searchEnabled)}
            className={cn(
              "rounded-full transition-all flex items-center gap-2 px-3 py-2 border h-9",
              searchEnabled
                ? "bg-[#4CD6B4]/10 border-[#4CD6B4] text-[#4CD6B4] hover:bg-[#4CD6B4]/20 hover:shadow-[#4CD6B4]/10 focus:ring-2 focus:ring-[#4CD6B4] focus:ring-offset-2 focus:ring-offset-[#1a1a1a]"
                : "bg-white/5 border-transparent text-white/40 hover:text-white hover:bg-white/10 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1a1a1a]",
              "hover:shadow-md hover:scale-[1.02] active:scale-95 transition-transform duration-200 ease-in-out"
            )}
            aria-label={searchEnabled ? "تعطيل البحث" : "تفعيل البحث"}
            aria-pressed={searchEnabled}
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
          className="bg-gradient-to-r from-[#1a1a1a]/90 to-[#2a2a2a]/90 backdrop-blur-lg border border-white/10 rounded-lg"
          micButtonStyle={
            isListening
              ? 'animate-pulse bg-[#4CD6B4] text-white'
              : 'bg-white/5 hover:bg-white/10'
          }
        />
      </div>
    </Card>
  );
}
