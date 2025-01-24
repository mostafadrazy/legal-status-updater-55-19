import { GoogleGenerativeAI } from '@google/generative-ai';
import { searchHandler } from './search';

async function analyzeQuestion(query: string, apiKey: string): Promise<string[]> {
  const prompt = `You are a search optimization expert. Analyze this question and generate 2-3 specific search queries that will help find the most relevant information. Focus on different aspects of the question.

Question: ${query}

Generate search queries that:
1. cover different aspects of the question
2. Use relevant keywords and terms
3. Are specific enough to get accurate results
4. Include any mentioned names, dates, or places
5. Consider both recent and historical information if relevant

Format your response as a simple list of queries, one per line. Do not include any other text.`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          topK: 20,
          topP: 0.8,
          maxOutputTokens: 256,
        }
      })
    }
  );

  if (!response.ok) {
    throw new Error('Failed to analyze question');
  }

  const data = await response.json();
  const queries = data.candidates[0].content.parts[0].text
    .split('\n')
    .filter(Boolean)
    .map(q => q.trim());

  return queries;
}

function detectLanguage(text: string): 'ar' | 'en' {
  const arabicPattern = /[\u0600-\u06FF]/;
  return arabicPattern.test(text) ? 'ar' : 'en';
}

export async function geminiHandler(query: string, searchResults: any[] = [], previousContext?: { query: string; answer: string }) {
  try {
    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    const isArabic = /[\u0600-\u06FF]/.test(query);
    
    let promptText = '';
    
    if (searchResults.length > 0) {
      const sources = searchResults
        .map(result => `${result.title}\n${result.snippet}`)
        .join('\n\n');

      promptText = isArabic 
        ? `بناءً على نتائج البحث التالية، قدم إجابة واضحة ومباشرة على هذا السؤال: ${query}

المعلومات المتوفرة:
${sources}

تعليمات مهمة:
1. قدم إجابة مباشرة وواضحة
2. لا تضع روابط في الإجابة
3. تجنب الإشارة إلى المصادر في نص الإجابة
4. اكتب بلغة سهلة ومفهومة`
        : `Based on the following search results, provide a clear and direct answer to this question: ${query}\n\nContext:\n${sources}`;
    } else {
      promptText = isArabic
        ? `قدم إجابة واضحة ومباشرة على هذا السؤال: ${query}

تعليمات مهمة:
1. قدم إجابة مباشرة وواضحة
2. لا تضع روابط في الإجابة
3. اكتب بلغة سهلة ومفهومة`
        : `Provide a clear and direct answer to this question: ${query}`;
    }

    if (previousContext) {
      promptText = `Previous: ${previousContext.query}\nAnswer: ${previousContext.answer}\n\nCurrent: ${promptText}`;
    }

    promptText += isArabic ? '\n\nالرجاء الإجابة باللغة العربية.' : '\n\nPlease respond in English.';

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
              text: promptText
            }]
          }],
          generationConfig: {
            temperature: 0.3,
            topK: 20,
            topP: 0.8,
            maxOutputTokens: 256,
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error('Failed to generate response');
    }

    const data = await response.json();
    const answer = data.candidates[0].content.parts[0].text;

    // Remove any URLs that might have been included in the response
    const cleanAnswer = answer.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');

    if (searchResults.length > 0) {
      const sourcesList = searchResults
        .map(result => `- ${result.title}: ${result.link}`)
        .join('\n');

      return `${cleanAnswer}\n\n${isArabic ? 'المصادر' : 'Sources'}:\n${sourcesList}`;
    }

    return cleanAnswer;
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}