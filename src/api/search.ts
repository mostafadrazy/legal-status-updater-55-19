interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  source: string;
}

function cleanQuery(query: string): string {
  return query.replace(/[^\w\s\u0600-\u06FF?.,-]/g, ' ').trim();
}

export async function searchHandler(query: string): Promise<SearchResult[]> {
  try {
    if (!query) return [];

    const cleanedQuery = cleanQuery(query);
    const TAVILY_API_KEY = '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';
    
    // Tavily Search API endpoint
    const searchUrl = 'https://api.tavily.com/search';
    const response = await fetch(searchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TAVILY_API_KEY}`
      },
      body: JSON.stringify({
        query: cleanedQuery,
        search_depth: "advanced",
        max_results: 10,
        include_domains: [],
        exclude_domains: [],
        include_answer: false,
        include_raw_content: false,
        include_images: false,
        include_similar_results: true,
        get_raw_search_results: true,
        sanitize_results: true
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Search API Error:', response.statusText, errorData);
      return [];
    }

    const data = await response.json();
    
    // Check if we have results
    if (!data?.results) {
      return [];
    }

    // Process and format results
    return data.results.map((item: any) => {
      try {
        const url = new URL(item.url);
        return {
          title: item.title || url.hostname,
          link: item.url,
          snippet: item.content || '',
          source: url.hostname
        };
      } catch (e) {
        console.error('Invalid URL:', item.url);
        return null;
      }
    }).filter(Boolean);

  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
}