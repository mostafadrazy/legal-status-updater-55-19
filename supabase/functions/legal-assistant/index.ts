import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { v4 as uuidv4 } from 'uuid';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const EXPECTED_TOKEN = "drazzzy0823";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify bearer token
    const authHeader = req.headers.get('authorization');
    if (!authHeader || authHeader !== `Bearer ${EXPECTED_TOKEN}`) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401,
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }

    const { prompt } = await req.json();

    // Generate a session ID if not provided
    const sessionId = uuidv4();

    // Call n8n webhook
    const response = await fetch('https://kadiya.app.n8n.cloud/webhook/legal-assistant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${EXPECTED_TOKEN}`
      },
      body: JSON.stringify({
        session_Id: sessionId,
        chatInput: prompt
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get response from assistant');
    }

    const data = await response.json();
    
    const formattedResponse = {
      response: data.response || data.output || 'No response received',
      timestamp: new Date().toISOString(),
    };

    return new Response(
      JSON.stringify(formattedResponse),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});

function extractSources(text: string): { url: string; title: string; relevance: string; }[] {
  const sourceRegex = /\[(.*?)\]\((https?:\/\/[^\s)]+)\)/g;
  const sources = [];
  let match;

  while ((match = sourceRegex.exec(text)) !== null) {
    sources.push({
      title: match[1],
      url: match[2],
      relevance: "Primary source"
    });
  }

  return sources;
}