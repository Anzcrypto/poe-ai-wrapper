# 🤖 Poe AI Wrapper

> A clean, simple frontend wrapper for AI chat interfaces. Perfect starting point for building your own AI-powered applications.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)

## 🌟 Features

- ✨ Clean, modern chat interface
- 🚀 Lightweight Express.js backend
- 📱 Fully responsive design
- 🎨 Easy to customize
- 🔌 Ready for AI API integration
- 🛠️ Simple architecture for learning

## 📸 Preview

The app provides a clean chat interface where users can interact with AI models. Currently in demo mode with echo responses.

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Anzcrypto/poe-ai-wrapper.git
   cd poe-ai-wrapper
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

That's it! You should see the chat interface.

## 📁 Project Structure

```
poe-ai-wrapper/
├── public/              # Frontend files
│   ├── index.html      # Main HTML structure
│   ├── style.css       # Styling and layout
│   └── app.js          # Client-side JavaScript
├── server.js           # Express backend server
├── package.json        # Dependencies and scripts
├── README.md           # This file
└── .gitignore         # Git ignore rules
```

## 🔧 How It Works

### Architecture Overview

```
User Input → Frontend (app.js) → POST /api/chat → Backend (server.js) → Response → UI Update
```

### Frontend Flow

1. User types a message in the input field
2. `app.js` captures the input and sends POST request to `/api/chat`
3. Shows "Thinking..." indicator while waiting
4. Receives response and displays it in the chat

### Backend Flow

1. Express server receives POST request at `/api/chat`
2. Extracts the message from request body
3. Processes the message (currently echo mode)
4. Returns JSON response with reply

### API Endpoint

**POST** `/api/chat`

**Request Body:**
```json
{
  "message": "Hello, AI!"
}
```

**Response:**
```json
{
  "reply": "Echo AI: Hello, AI!",
  "model": "demo-model"
}
```

## 🎨 Customization

### Change Colors

Edit `public/style.css`:

```css
/* Primary color (header, buttons) */
background-color: #4CAF50;  /* Change this */

/* User message bubble */
background-color: #e1ffc7;  /* Change this */

/* Bot message bubble */
background-color: #f0f0f0;  /* Change this */
```

### Change Port

Edit `server.js`:

```javascript
const PORT = process.env.PORT || 3000;  // Change 3000 to your port
```

Or set environment variable:
```bash
PORT=8080 npm start
```

### Modify UI Text

Edit `public/index.html`:

```html
<h1>🤖 Poe AI Wrapper</h1>  <!-- Change title -->
<p>Free AI Chat Interface</p>  <!-- Change subtitle -->
```

## 🔌 Integrating Real AI

Currently, the app is in **demo mode** (echo responses). Here's how to connect real AI:

### Option 1: OpenAI API

1. Install OpenAI SDK:
   ```bash
   npm install openai
   ```

2. Update `server.js`:
   ```javascript
   const OpenAI = require('openai');
   const openai = new OpenAI({
     apiKey: process.env.OPENAI_API_KEY
   });

   app.post('/api/chat', async (req, res) => {
     const { message } = req.body;
     
     try {
       const completion = await openai.chat.completions.create({
         model: "gpt-3.5-turbo",
         messages: [{ role: "user", content: message }]
       });
       
       return res.json({
         reply: completion.choices[0].message.content,
         model: "gpt-3.5-turbo"
       });
     } catch (error) {
       return res.status(500).json({ error: error.message });
     }
   });
   ```

3. Set your API key:
   ```bash
   export OPENAI_API_KEY="your-api-key-here"
   npm start
   ```

### Option 2: OpenRouter (Multiple Models)

1. Install axios:
   ```bash
   npm install axios
   ```

2. Update `server.js`:
   ```javascript
   const axios = require('axios');

   app.post('/api/chat', async (req, res) => {
     const { message } = req.body;
     
     try {
       const response = await axios.post(
         'https://openrouter.ai/api/v1/chat/completions',
         {
           model: "meta-llama/llama-3.1-8b-instruct:free",
           messages: [{ role: "user", content: message }]
         },
         {
           headers: {
             'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
             'Content-Type': 'application/json'
           }
         }
       );
       
       return res.json({
         reply: response.data.choices[0].message.content,
         model: "llama-3.1-8b"
       });
     } catch (error) {
       return res.status(500).json({ error: error.message });
     }
   });
   ```

### Option 3: Local Models (Ollama)

1. Install Ollama from https://ollama.ai
2. Pull a model: `ollama pull llama2`
3. Update `server.js`:
   ```javascript
   const axios = require('axios');

   app.post('/api/chat', async (req, res) => {
     const { message } = req.body;
     
     try {
       const response = await axios.post('http://localhost:11434/api/generate', {
         model: "llama2",
         prompt: message,
         stream: false
       });
       
       return res.json({
         reply: response.data.response,
         model: "llama2-local"
       });
     } catch (error) {
       return res.status(500).json({ error: error.message });
     }
   });
   ```

## 🚢 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

### Deploy to Railway

1. Create account at https://railway.app
2. Connect your GitHub repo
3. Railway auto-detects Node.js and deploys

### Deploy to Heroku

1. Install Heroku CLI
2. Create app:
   ```bash
   heroku create your-app-name
   ```

3. Deploy:
   ```bash
   git push heroku main
   ```

## 🛠️ Development

### Available Scripts

```bash
npm start       # Start the server
npm run dev     # Start with nodemon (auto-reload)
```

### Adding Auto-Reload (Development)

1. Install nodemon:
   ```bash
   npm install --save-dev nodemon
   ```

2. Update `package.json`:
   ```json
   "scripts": {
     "start": "node server.js",
     "dev": "nodemon server.js"
   }
   ```

3. Run with auto-reload:
   ```bash
   npm run dev
   ```

## 📚 Learning Resources

### Understanding the Code

**Frontend (app.js):**
- Event listeners for user input
- Fetch API for HTTP requests
- DOM manipulation for UI updates

**Backend (server.js):**
- Express.js routing
- JSON parsing middleware
- Static file serving

### Next Steps for Learning

1. **Add chat history** - Store messages in array
2. **Add user authentication** - Use JWT or sessions
3. **Add database** - Store conversations (MongoDB, PostgreSQL)
4. **Add file upload** - Handle images/documents
5. **Add streaming responses** - Real-time AI output
6. **Add markdown rendering** - Format AI responses

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=8080 npm start
```

### Cannot find module 'express'
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### CORS errors when deploying
Add CORS middleware in `server.js`:
```javascript
const cors = require('cors');
app.use(cors());
```

## 💡 Ideas for Enhancement

- [ ] Add chat history persistence
- [ ] Add multiple AI model selection
- [ ] Add user authentication
- [ ] Add conversation export (JSON/PDF)
- [ ] Add voice input/output
- [ ] Add image generation support
- [ ] Add code syntax highlighting
- [ ] Add dark mode toggle
- [ ] Add typing indicators
- [ ] Add message reactions

## 📞 Support

- Create an issue: [GitHub Issues](https://github.com/Anzcrypto/poe-ai-wrapper/issues)
- Twitter: [@Andika669](https://twitter.com/Andika669)

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

**Built with ❤️ by [Wowok](https://github.com/Anzcrypto)**
