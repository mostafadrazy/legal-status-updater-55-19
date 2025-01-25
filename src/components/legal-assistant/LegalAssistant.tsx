import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { Bot, Globe, Plus, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Message from "./Message";
import ChatInput from "./ChatInput";
import { useChatLogic } from "./ChatLogic";
import { useChatHistory } from "@/contexts/ChatHistoryContext";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export function LegalAssistant() {
  const [searchEnabled, setSearchEnabled] = useState(false);
  const { session, user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, startNewChat } = useChatHistory();
  
  const {
    input,
    setInput,
    isLoading,
    isTyping,
    handleSubmit
  } = useChatLogic();
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom when messages change or when AI is typing
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript, setInput]);

  useEffect(() => {
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
      toast({
        title: "خطأ",
        description: "عذراً، متصفحك لا يدعم خاصية التحدث",
        variant: "destructive"
      });
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

  const handleChatSubmit = (e: React.FormEvent) => {
    if (listening) {
      SpeechRecognition.stopListening();
      setIsListening(false);
    }
    handleSubmit(e, searchEnabled);
  };

  const handleNewChat = async () => {
    try {
      await startNewChat();
      toast({
        title: "تم إنشاء محادثة جديدة",
        description: "يمكنك الآن بدء محادثة جديدة",
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إنشاء محادثة جديدة",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#111] border-0 flex flex-col relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4CD6B4]/5 via-transparent to-[#9b87f5]/5 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.015] pointer-events-none" />
      
      <ScrollArea className="flex-1 px-4 py-6 relative">
        <div className="space-y-6 max-w-4xl mx-auto">
          {messages.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6"
            >
              <div className="relative">
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-[#4CD6B4] to-[#34D399] flex items-center justify-center shadow-lg shadow-[#4CD6B4]/20">
                  <Bot className="h-10 w-10 text-white" />
                </div>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-2 -right-2"
                >
                  <Sparkles className="h-6 w-6 text-[#4CD6B4]" />
                </motion.div>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white">المستشار القانوني</h3>
                <p className="text-base text-gray-400 max-w-md leading-relaxed">
                  مرحباً بك في المستشار القانوني. كيف يمكنني مساعدتك اليوم؟
                </p>
              </div>
            </motion.div>
          )}
          
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Message
                  role={message.role}
                  content={message.content}
                  timestamp={message.timestamp}
                  searchResults={message.searchResults}
                  userProfile={userProfile}
                  isTyping={isTyping && index === messages.length - 1}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="flex-shrink-0 border-t border-white/5 bg-gradient-to-b from-black/50 to-black/80 backdrop-blur-xl p-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 mb-3 px-4">
          <Button
            onClick={handleNewChat}
            className={cn(
              "rounded-xl transition-all flex items-center justify-center gap-2 px-4 py-2 h-9 w-full sm:w-auto",
              "bg-gradient-to-r from-[#4CD6B4]/80 to-[#34D399]/80 hover:from-[#4CD6B4] hover:to-[#34D399]",
              "text-white shadow-lg shadow-[#4CD6B4]/20 hover:shadow-[#4CD6B4]/30",
              "border border-white/10 hover:border-white/20"
            )}
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">محادثة جديدة</span>
          </Button>
          
          <button
            onClick={() => setSearchEnabled(!searchEnabled)}
            className={cn(
              "rounded-xl transition-all flex items-center justify-center gap-2 px-4 py-2 h-9 w-full sm:w-auto border",
              searchEnabled
                ? "bg-[#4CD6B4]/10 border-[#4CD6B4] text-[#4CD6B4]"
                : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10"
            )}
          >
            <motion.div
              animate={{
                rotate: searchEnabled ? 180 : 0,
                scale: searchEnabled ? 1.1 : 1,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <Globe className="w-4 h-4" />
            </motion.div>
            <AnimatePresence>
              {searchEnabled && (
                <motion.span
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm overflow-hidden whitespace-nowrap"
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
          handleSubmit={handleChatSubmit}
          isLoading={isLoading}
          isListening={isListening}
          handleMicClick={handleMicClick}
        />
      </div>
    </Card>
  );
}