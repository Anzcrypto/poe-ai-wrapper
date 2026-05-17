const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message required' });
  }

  // Placeholder response
  return res.json({
    reply: `Echo AI: ${message}`,
    model: 'demo-model'
  });
});

app.listen(PORT, () => {
  console.log(`Poe AI Wrapper running on http://localhost:${PORT}`);
});
