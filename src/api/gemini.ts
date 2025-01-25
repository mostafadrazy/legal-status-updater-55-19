import { GoogleGenerativeAI } from '@google/generative-ai';
import { searchHandler } from './search';

function detectLanguage(text: string): 'ar' | 'en' {
  // Arabic Unicode range pattern
  const arabicPattern = /[\u0600-\u06FF]/;
  return arabicPattern.test(text) ? 'ar' : 'en';
}

function shouldUseFullContext(query: string): boolean {
  // Keywords that indicate we need more context
  const fullContextKeywords = [
    'before', 'previously', 'earlier', 'mentioned', 'said',
    'قبل', 'سابقا', 'ذكرت', 'قلت', 'اشرت'
  ];
  
  const lowercaseQuery = query.toLowerCase();
  return fullContextKeywords.some(keyword => lowercaseQuery.includes(keyword.toLowerCase()));
}

async function understandContext(
  query: string,
  previousMessages?: { role: 'user' | 'assistant'; content: string }[]
): Promise<string> {
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set');
  }

  const needsFullContext = shouldUseFullContext(query);
  console.log('Query needs full context:', needsFullContext);

  // Use either last 5 messages or just the last pair based on context needs
  const context = previousMessages
    ? previousMessages
        .slice(needsFullContext ? -5 : -2)
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n')
    : '';

  const contextPrompt = `
${context ? `${needsFullContext ? 'Previous conversation' : 'Immediate context'}:\n${context}\n\n` : ''}
Current question: ${query}

${needsFullContext 
  ? 'Analyze the conversation history and current question to generate a comprehensive search query.'
  : 'Focus only on the immediate context and current question to generate a focused search query.'}
Return ONLY the search query, nothing else.`;

  console.log(`Understanding ${needsFullContext ? 'full' : 'immediate'} context and generating search query...`);

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: contextPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.1,
          topK: 1,
          topP: 1,
          maxOutputTokens: 100,
        }
      })
    }
  );

  if (!response.ok) {
    throw new Error('Failed to understand context and generate search query');
  }

  const data = await response.json();
  const searchQuery = data.candidates[0].content.parts[0].text.trim();
  console.log('Generated search query:', searchQuery);
  return searchQuery;
}

async function generateFinalResponse(
  query: string,
  searchResults: any[],
  previousMessages?: { role: 'user' | 'assistant'; content: string }[]
): Promise<string> {
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set');
  }

  const isArabic = detectLanguage(query) === 'ar';
  const needsFullContext = shouldUseFullContext(query);
  
  // Use either last 5 messages or just the last pair based on context needs
  const contextToUse = previousMessages?.slice(needsFullContext ? -5 : -2) || [];
  
  const finalPrompt = `
Question: ${query}
${searchResults.length > 0 ? `\nRelevant information:\n${searchResults.map(r => r.snippet).join('\n')}` : ''}
${contextToUse.length ? `\n${needsFullContext ? 'Conversation history' : 'Immediate context'}:\n${contextToUse.map(m => `${m.role}: ${m.content}`).join('\n')}` : ''}

Based on the ${needsFullContext ? 'conversation history' : 'immediate context'} and search results above, provide a ${needsFullContext ? 'comprehensive' : 'focused'} response in ${isArabic ? 'Arabic' : 'English'} that:
1. ${needsFullContext ? 'Addresses the question while considering the conversation history' : 'Directly addresses the current question'}
2. ${needsFullContext ? 'Maintains continuity with the conversation history' : 'Maintains natural flow with the immediate context'}
3. Incorporates relevant details from search results
4. Provides accurate and helpful information
${needsFullContext ? '5. Connects the response to previous context when relevant' : '5. Stays focused on the current topic without bringing up old context'}

Important: Do not include or mention sources in your response. The sources will be handled separately.`;

  console.log(`Generating ${needsFullContext ? 'comprehensive' : 'focused'} response based on ${needsFullContext ? 'conversation history' : 'immediate context'}...`);

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: finalPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          topK: 20,
          topP: 0.8,
          maxOutputTokens: 800,
        }
      })
    }
  );

  if (!response.ok) {
    throw new Error('Failed to generate final response');
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

export async function geminiHandler(
  query: string,
  searchEnabled: boolean = false,
  previousMessages?: { role: 'user' | 'assistant'; content: string }[]
) {
  try {
    console.log('Starting conversation processing...');
    console.log('Input:', { query, searchEnabled, previousMessages });
    
    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    let searchResults: any[] = [];
    
    if (searchEnabled) {
      // Step 1: Understand context and generate focused search query
      const searchQuery = await understandContext(query, previousMessages);
      console.log('Step 1 complete: Generated search query:', searchQuery);

      // Step 2: Perform search with the focused query
      searchResults = await searchHandler(searchQuery);
      console.log('Step 2 complete: Retrieved search results:', searchResults);
    }

    // Step 3: Generate final response using appropriate context level
    const finalResponse = await generateFinalResponse(query, searchResults, previousMessages);
    console.log('Step 3 complete: Generated response');

    return {
      response: finalResponse,
      searchResults: searchResults.length > 0 ? searchResults : undefined
    };
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}