const axios = require('axios');

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const DEFAULT_MODEL = 'meta-llama/llama-3.1-8b-instruct:free';

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message required' });
  }

  // If no API key, use echo mode
  if (!OPENROUTER_API_KEY) {
    return res.json({
      reply: `Echo (demo mode): ${message}`,
      model: 'demo-mode'
    });
  }

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: DEFAULT_MODEL,
        messages: [
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://demo-ai0.vercel.app',
          'X-Title': 'PocketAI Companion'
        },
        timeout: 30000
      }
    );

    const reply = response.data.choices[0]?.message?.content || 'No response from AI';
    
    return res.json({
      reply: reply,
      model: DEFAULT_MODEL
    });

  } catch (error) {
    console.error('OpenRouter API Error:', error.response?.data || error.message);

    // Fallback to echo mode on error
    return res.json({
      reply: `Echo (API error): ${message}`,
      model: 'fallback-echo'
    });
  }
};
