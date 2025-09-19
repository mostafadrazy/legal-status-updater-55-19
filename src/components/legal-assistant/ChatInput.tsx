import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mic, MicOff, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  isListening: boolean;
  handleMicClick: () => void;
  searchEnabled: boolean;
  setSearchEnabled: (enabled: boolean) => void;
}

const ChatInput = ({ 
  input, 
  setInput, 
  handleSubmit, 
  isLoading, 
  isListening, 
  handleMicClick,
  searchEnabled,
  setSearchEnabled
}: ChatInputProps) => {
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 48,
    maxHeight: 164,
  });

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative max-w-4xl w-full mx-auto">
        <div className="relative">
          <div className="overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl" style={{ maxHeight: "164px" }}>
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                adjustHeight();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="اكتب سؤالك هنا..."
              className="w-full px-6 py-5 bg-transparent border-none text-white/90 placeholder:text-white/40 resize-none focus-visible:ring-0 leading-relaxed text-base"
              dir="rtl"
            />
            <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-gradient-to-r from-black/20 to-transparent">
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  onClick={handleMicClick}
                  className={cn(
                    "rounded-xl p-3 transition-all duration-300 h-11 w-11",
                    isListening
                      ? "bg-red-500 text-white hover:bg-red-600 animate-pulse shadow-lg shadow-red-500/30"
                      : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white hover:shadow-lg"
                  )}
                >
                  {isListening ? (
                    <MicOff className="w-5 h-5" />
                  ) : (
                    <Mic className="w-5 h-5" />
                  )}
                </Button>
                
                <Button
                  type="button"
                  onClick={() => setSearchEnabled(!searchEnabled)}
                  className={cn(
                    "rounded-xl p-3 transition-all duration-300 h-11 w-11",
                    searchEnabled
                      ? "bg-[#4CD6B4]/20 border border-[#4CD6B4] text-[#4CD6B4] hover:bg-[#4CD6B4]/30"
                      : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white hover:shadow-lg"
                  )}
                >
                  <Globe className="w-5 h-5" />
                </Button>
              </div>
              
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className={cn(
                  "rounded-xl px-6 py-3 transition-all duration-300 h-11",
                  input.trim()
                    ? "bg-gradient-to-r from-[#4CD6B4] to-[#34D399] text-white hover:shadow-lg hover:shadow-[#4CD6B4]/30 hover:scale-105"
                    : "bg-white/10 text-white/30 cursor-not-allowed"
                )}
              >
                <Send className="w-5 h-5 ml-2" />
                <span className="text-sm font-medium">إرسال</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;