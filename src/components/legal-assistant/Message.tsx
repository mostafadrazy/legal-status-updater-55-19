import { Clock, Bot, User } from "lucide-react";

interface MessageProps {
  role: 'assistant' | 'user';
  content: string;
  timestamp?: string;
  userProfile?: {
    full_name?: string | null;
    avatar_url?: string | null;
  };
}

const Message = ({ role, content, timestamp, userProfile }: MessageProps) => {
  return (
    <div
      className={`flex flex-col gap-4 ${
        role === 'assistant' 
          ? 'bg-[#0A1F1A]/80 border border-[#4CD6B4]/30 hover:border-[#4CD6B4]/50' 
          : 'bg-[#162922]/80 border border-[#4CD6B4]/20 hover:border-[#4CD6B4]/40'
      } rounded-2xl p-6 backdrop-blur-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#4CD6B4]/5 group`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-base text-white/90 leading-relaxed whitespace-pre-wrap break-words text-right">
            {content}
          </p>
          
          {timestamp && (
            <div className="flex items-center gap-2 text-xs text-[#4CD6B4]/60 mt-3 justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Clock className="w-3 h-3" />
              {new Date(timestamp).toLocaleString('ar-MA')}
            </div>
          )}
        </div>
        {role === 'assistant' ? (
          <div className="bg-gradient-to-br from-[#4CD6B4] to-[#2A9D8F] p-3 rounded-xl shadow-lg shadow-[#4CD6B4]/20 group-hover:shadow-[#4CD6B4]/30 transition-all duration-300">
            <Bot className="w-6 h-6 text-white" />
          </div>
        ) : (
          <div className="bg-gradient-to-br from-[#2A9D8F] to-[#1E7268] p-3 rounded-xl shadow-lg shadow-[#2A9D8F]/20 group-hover:shadow-[#2A9D8F]/30 transition-all duration-300">
            {userProfile?.avatar_url ? (
              <img 
                src={userProfile.avatar_url} 
                alt={userProfile.full_name || 'User'} 
                className="w-6 h-6 rounded-xl object-cover"
              />
            ) : (
              <User className="w-6 h-6 text-white" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;