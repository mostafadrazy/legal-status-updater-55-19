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
    <div className="w-full h-full flex flex-col relative overflow-hidden">
      {/* Modern Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#1a1a1a]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,214,180,0.1),transparent_50%)]" />
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(76,214,180,0.02)_50%,transparent_75%)] bg-[length:20px_20px]" />
      
      {/* Header Section */}
      <div className="flex-shrink-0 p-6 border-b border-white/10 bg-gradient-to-r from-black/20 to-transparent backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#4CD6B4] to-[#34D399] flex items-center justify-center shadow-lg">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-black"></div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">المستشار القانوني الذكي</h2>
              <p className="text-sm text-gray-400">متاح الآن</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              onClick={handleNewChat}
              className="rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              محادثة جديدة
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <ScrollArea className="flex-1 relative">
        <div className="p-6 space-y-6 max-w-4xl mx-auto">
          {messages.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8"
            >
              <div className="relative">
                <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-[#4CD6B4] to-[#34D399] flex items-center justify-center shadow-2xl shadow-[#4CD6B4]/30">
                  <Bot className="h-12 w-12 text-white" />
                </div>
                <motion.div 
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute -top-2 -right-2"
                >
                  <Sparkles className="h-6 w-6 text-[#4CD6B4]" />
                </motion.div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-[#4CD6B4] bg-clip-text text-transparent">
                  مرحباً بك في المستشار القانوني
                </h3>
                <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
                  أنا هنا لمساعدتك في جميع استفساراتك القانونية. يمكنك طرح أي سؤال وسأقدم لك الإجابة المناسبة
                </p>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200">
                  <h4 className="font-semibold text-white mb-2">صياغة العقود</h4>
                  <p className="text-sm text-gray-400">ساعدني في صياغة عقد</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200">
                  <h4 className="font-semibold text-white mb-2">الاستشارات القانونية</h4>
                  <p className="text-sm text-gray-400">أحتاج استشارة قانونية</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200">
                  <h4 className="font-semibold text-white mb-2">تحليل الوثائق</h4>
                  <p className="text-sm text-gray-400">حلل هذه الوثيقة القانونية</p>
                </div>
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
                transition={{ duration: 0.4, delay: index * 0.05 }}
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

      {/* Input Section */}
      <div className="flex-shrink-0 border-t border-white/10 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-xl p-6">
        <ChatInput
          input={input}
          setInput={setInput}
          handleSubmit={handleChatSubmit}
          isLoading={isLoading}
          isListening={isListening}
          handleMicClick={handleMicClick}
          searchEnabled={searchEnabled}
          setSearchEnabled={setSearchEnabled}
        />
      </div>
    </div>
  );
}