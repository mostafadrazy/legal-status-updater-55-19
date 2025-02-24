import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  isListening: boolean;
  handleMicClick: () => void;
}

const ChatInput = ({ 
  input, 
  setInput, 
  handleSubmit, 
  isLoading, 
  isListening, 
  handleMicClick 
}: ChatInputProps) => {
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 48,
    maxHeight: 164,
  });

  return (
    <form onSubmit={handleSubmit} className="w-full py-4">
      <div className="relative max-w-4xl w-full mx-auto">
        <div className="relative flex flex-col">
          <div className="overflow-hidden rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg transition-all duration-300 hover:bg-white/[0.07] hover:border-white/20" style={{ maxHeight: "164px" }}>
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
              className="w-full px-5 py-4 bg-transparent border-none text-white/90 placeholder:text-white/30 resize-none focus-visible:ring-0 leading-relaxed"
              dir="rtl"
            />
            <div className="h-14 flex items-center justify-between px-4 border-t border-white/10 bg-black/20">
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className={cn(
                  "rounded-xl p-2 transition-all duration-300 h-9 w-9",
                  input.trim()
                    ? "bg-gradient-to-r from-[#4CD6B4] to-[#34D399] text-white hover:shadow-lg hover:shadow-[#4CD6B4]/20 hover:scale-105"
                    : "bg-white/10 text-white/20"
                )}
              >
                <Send className="w-4 h-4" />
              </Button>
              
              <Button
                type="button"
                onClick={handleMicClick}
                className={cn(
                  "rounded-xl p-2 transition-all duration-300 h-9 w-9",
                  isListening
                    ? "bg-red-500 text-white hover:bg-red-600 animate-pulse shadow-lg shadow-red-500/20"
                    : "bg-gradient-to-r from-[#4CD6B4] to-[#34D399] text-white hover:shadow-lg hover:shadow-[#4CD6B4]/20 hover:scale-105"
                )}
              >
                {isListening ? (
                  <MicOff className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;