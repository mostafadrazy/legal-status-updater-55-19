export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
}

export interface ChatSection {
  query: string;
  answer: string;
  searchResults: SearchResult[];
  timestamp: string;
}

export interface SuggestionType {
  label: string;
  prefix: string;
}
