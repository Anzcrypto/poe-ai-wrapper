const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Groq free model
const DEFAULT_MODEL = 'llama-3.3-70b-versatile';

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message required' });
  }

  // If no API key, use echo mode
  if (!GROQ_API_KEY) {
    return res.json({
      reply: `Echo (demo mode): ${message}`,
      model: 'demo-mode'
    });
  }

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
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
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
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
    console.error('Groq API Error:', error.response?.data || error.message);

    // Fallback to echo mode on error
    return res.json({
      reply: `Echo (API error): ${message}`,
      model: 'fallback-echo'
    });
  }
});

app.listen(PORT, () => {
  const mode = GROQ_API_KEY ? 'Groq AI' : 'Demo (echo)';
  console.log(`🚀 PocketAI Companion running on http://localhost:${PORT}`);
  console.log(`📡 Mode: ${mode}`);
  if (!GROQ_API_KEY) {
    console.log('💡 Tip: Set GROQ_API_KEY env var to enable real AI responses');
  }
});
