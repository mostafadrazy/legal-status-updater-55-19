interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  source: string;
}

function cleanQuery(query: string): string {
  return query.replace(/[^\w\s\u0600-\u06FF?.,-]/g, ' ').trim();
}

function truncateQuery(query: string, maxLength: number = 400): string {
  if (query.length <= maxLength) return query;
  
  // Split into sentences and take as many complete sentences as possible
  const sentences = query.split(/[.!?]+/);
  let result = '';
  
  for (const sentence of sentences) {
    const potentialResult = result + sentence.trim() + '. ';
    if (potentialResult.length > maxLength) break;
    result = potentialResult;
  }
  
  // If we still don't have anything (single long sentence), just truncate
  if (!result) {
    return query.slice(0, maxLength - 3) + '...';
  }
  
  return result.trim();
}

export async function searchHandler(query: string): Promise<SearchResult[]> {
  try {
    if (!query) return [];

    const cleanedQuery = cleanQuery(query);
    const truncatedQuery = truncateQuery(cleanedQuery);
    
    console.log('Original query length:', query.length);
    console.log('Truncated query length:', truncatedQuery.length);
    
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
        query: truncatedQuery,
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