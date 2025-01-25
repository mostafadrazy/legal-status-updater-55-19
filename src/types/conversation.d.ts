interface Conversation {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

interface ConversationMessage {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant';
  content: string;
  search_query?: string;
  search_results?: any;
  created_at: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  searchResults?: any;
}