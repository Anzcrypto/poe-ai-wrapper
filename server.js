const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Default free model from OpenRouter
const DEFAULT_MODEL = 'qwen/qwen3-32b:free';

app.post('/api/chat', async (req, res) => {
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
          'HTTP-Referer': 'http://localhost:3000',
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
});

app.listen(PORT, () => {
  const mode = OPENROUTER_API_KEY ? 'OpenRouter' : 'Demo (echo)';
  console.log(`🚀 PocketAI Companion running on http://localhost:${PORT}`);
  console.log(`📡 Mode: ${mode}`);
  if (!OPENROUTER_API_KEY) {
    console.log('💡 Tip: Set OPENROUTER_API_KEY env var to enable real AI responses');
  }
});
