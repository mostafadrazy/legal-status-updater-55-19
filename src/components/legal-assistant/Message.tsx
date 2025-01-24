import { Clock, Bot, User, Link2, Globe, ChevronDown, ChevronUp } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useState } from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MessageProps {
  messageRole: 'assistant' | 'user';
  content: string;
  timestamp?: string;
  searchResults?: any[];
  userProfile?: {
    full_name?: string | null;
    avatar_url?: string | null;
  };
  isTyping?: boolean;
  className?: string;
}

const hasRTLCharacters = (text: string) => {
  const rtlRegex = /[\u0591-\u07FF\u200F\u202B\u202E\uFB1D-\uFDFD\uFE70-\uFEFC]/;
  return rtlRegex.test(text);
};

const Message = ({ messageRole, content, timestamp, searchResults, userProfile, isTyping, className }: MessageProps) => {
  let mainContent = content;
  let sourcesContent = '';
  
  if (messageRole === 'assistant' && content.includes('\n\nSources:')) {
    [mainContent, sourcesContent] = content.split('\n\nSources:');
  }

  const [failedFavicons, setFailedFavicons] = useState<Set<string>>(new Set());
  const [showAllSources, setShowAllSources] = useState(false);

  const handleFaviconError = (hostname: string) => {
    setFailedFavicons(prev => new Set(prev).add(hostname));
  };

  const isContentRTL = hasRTLCharacters(mainContent);
  const isSourcesRTL = hasRTLCharacters(sourcesContent);
  const messageAlignment = messageRole === 'assistant' ? 'items-start' : 'items-end';
  const bubbleAlignment = messageRole === 'assistant' ? 'mr-auto' : 'ml-auto';
  const textAlignment = isContentRTL ? 'text-right' : 'text-left';
  const flexDirection = isContentRTL ? 'flex-row-reverse' : 'flex-row';

  const visibleResults = showAllSources ? searchResults : searchResults?.slice(0, 3);

  // Generate a summary of the search results
  const generateSummary = () => {
    if (!searchResults?.length) return '';
    
    const topics = searchResults.map(result => result.title).join(', ');
    return isSourcesRTL 
      ? `تم العثور على ${searchResults.length} مصادر تتعلق بـ: ${topics}`
      : `Found ${searchResults.length} sources related to: ${topics}`;
  };

  return (
    <div className={cn("w-full", className)}>
      <div className={`flex flex-col gap-4 ${messageAlignment}`}>
        <div className={`flex flex-col w-full max-w-3xl space-y-4 ${bubbleAlignment}`}>
          <div 
            className={`inline-block w-full rounded-lg px-4 sm:px-6 py-4 ${
              messageRole === 'assistant'
                ? 'bg-[#1a1a1a] text-white'
                : 'bg-[#2A9D8F] text-white'
            }`}
            dir={isContentRTL ? 'rtl' : 'ltr'}
          >
            {messageRole === 'assistant' && isTyping ? (
              <div className={`flex items-center gap-2 ${flexDirection}`}>
                <div className="h-2 w-2 rounded-full bg-[#4CD6B4] animate-bounce [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 rounded-full bg-[#4CD6B4] animate-bounce [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 rounded-full bg-[#4CD6B4] animate-bounce"></div>
              </div>
            ) : messageRole === 'assistant' ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                className={`prose prose-invert max-w-none break-words ${textAlignment}`}
                components={{
                  p: ({ children }) => <p dir="auto" className={`${textAlignment} text-base sm:text-lg leading-relaxed whitespace-pre-wrap break-words`}>{children}</p>,
                  li: ({ children }) => <li dir="auto" className={`${textAlignment} text-base sm:text-lg whitespace-pre-wrap break-words`}>{children}</li>,
                  h1: ({ children }) => <h1 dir="auto" className={`${textAlignment} text-xl sm:text-2xl font-bold whitespace-pre-wrap break-words`}>{children}</h1>,
                  h2: ({ children }) => <h2 dir="auto" className={`${textAlignment} text-lg sm:text-xl font-bold whitespace-pre-wrap break-words`}>{children}</h2>,
                  h3: ({ children }) => <h3 dir="auto" className={`${textAlignment} text-base sm:text-lg font-bold whitespace-pre-wrap break-words`}>{children}</h3>,
                  code: ({ children }) => <code className="bg-black/20 rounded px-1 py-0.5 font-mono text-sm break-words">{children}</code>,
                  pre: ({ children }) => <pre className="bg-black/20 rounded p-4 overflow-x-auto whitespace-pre-wrap break-words">{children}</pre>,
                }}
              >
                {mainContent}
              </ReactMarkdown>
            ) : (
              <div dir="auto" className={`${textAlignment} text-base sm:text-lg leading-relaxed whitespace-pre-wrap break-words`}>{content}</div>
            )}
          </div>

          {messageRole === 'assistant' && searchResults && searchResults.length > 0 && (
            <div className="space-y-2 bg-[#1a1a1a] rounded-lg p-4 border border-white/10">
              <div className={`flex items-center gap-2 text-[#4CD6B4] ${isSourcesRTL ? 'flex-row-reverse' : 'flex-row'} mb-3`}>
                <Link2 className="h-4 w-4" />
                <span className="text-sm font-medium" dir="auto">
                  {isSourcesRTL ? 'المصادر' : 'Sources'}
                </span>
              </div>
              
              <p className={`text-sm text-gray-400 mb-4 ${textAlignment} whitespace-pre-wrap break-words`} dir="auto">
                {generateSummary()}
              </p>

              <div className="grid gap-2">
                {visibleResults?.map((result, index) => {
                  const hostname = new URL(result.link).hostname;
                  const isResultRTL = hasRTLCharacters(result.title);
                  return (
                    <a
                      key={index}
                      href={result.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 rounded bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
                      dir={isResultRTL ? 'rtl' : 'ltr'}
                    >
                      {!failedFavicons.has(hostname) ? (
                        <img 
                          src={`https://www.google.com/s2/favicons?domain=${hostname}&sz=32`}
                          alt=""
                          className="w-4 h-4 rounded flex-shrink-0"
                          onError={() => handleFaviconError(hostname)}
                        />
                      ) : (
                        <Globe className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      )}
                      <div className={`flex flex-col flex-1 min-w-0 ${isResultRTL ? 'text-right' : 'text-left'}`}>
                        <span className="text-sm text-white/90 line-clamp-1 whitespace-pre-wrap break-words">{result.title}</span>
                        <span className="text-xs text-gray-400 line-clamp-1">{hostname}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
              {searchResults.length > 3 && (
                <Button
                  variant="ghost"
                  className="w-full mt-2 text-[#4CD6B4] hover:text-[#4CD6B4] hover:bg-white/5"
                  onClick={() => setShowAllSources(!showAllSources)}
                >
                  {showAllSources ? (
                    <ChevronUp className="w-4 h-4 mr-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 mr-2" />
                  )}
                  {showAllSources ? 'Show Less' : `Show ${searchResults.length - 3} More`}
                </Button>
              )}
            </div>
          )}

          {timestamp && (
            <div className={`flex items-center gap-1 text-xs text-gray-400 ${
              messageRole === 'assistant' ? 'justify-start' : 'justify-end'
            }`}>
              <Clock className="h-3 w-3" />
              <span>{new Date(timestamp).toLocaleString(isContentRTL ? 'ar-MA' : 'en-US')}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;