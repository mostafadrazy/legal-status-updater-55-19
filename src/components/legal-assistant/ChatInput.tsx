import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mic, MicOff } from "lucide-react";

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
  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <Button 
        type="submit" 
        disabled={isLoading || !input.trim()}
        className="bg-gradient-to-r from-[#4CD6B4] to-[#2A9D8F] hover:from-[#2A9D8F] hover:to-[#1E7268] text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed h-[60px] w-[60px] rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#4CD6B4]/20"
      >
        <Send className="w-6 h-6" />
      </Button>

      <Button
        type="button"
        onClick={handleMicClick}
        className={`${
          isListening
            ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
            : 'bg-gradient-to-r from-[#4CD6B4] to-[#2A9D8F] hover:from-[#2A9D8F] hover:to-[#1E7268]'
        } text-white transition-all duration-300 h-[60px] w-[60px] rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#4CD6B4]/20`}
      >
        {isListening ? (
          <MicOff className="w-6 h-6 animate-pulse" />
        ) : (
          <Mic className="w-6 h-6" />
        )}
      </Button>

      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="اكتب سؤالك هنا..."
        className="flex-1 bg-[#111]/90 border border-[#4CD6B4]/20 text-white placeholder:text-[#4CD6B4]/40 focus:border-[#2A9D8F]/50 focus:ring-[#2A9D8F]/50 transition-all duration-300 rounded-xl h-[60px] py-4 resize-none hover:border-[#4CD6B4]/30"
      />
    </form>
  );
};

export default ChatInput;