# PocketAI Companion

Mobile-first AI companion prototype. Built for fast, clean, intuitive chat UX on web and mobile.

> Positioning: not "another chatbot demo".
> This repo shows product taste, lightweight frontend execution, and AI integration readiness.

## Why this project matters

Most AI demos stop at "send prompt → get answer".
This project pushes one layer higher:
- mobile-first interface
- quick action UX
- clean assistant feel
- easy AI provider swap
- portfolio-ready structure

If you want repo that feels closer to future consumer AI products, this is stronger than raw API snippets.

## Core idea

PocketAI Companion is lightweight AI assistant interface designed for:
- mobile users
- fast chat interactions
- easy AI integration
- product prototype demos
- portfolio/showcase use

Current mode:
- works in **demo mode** without API key
- supports **real AI** with Groq when API key is added
- can be positioned as **MiMo-style mobile AI companion demo** for showcase and evaluation

---

## Features

### Product / UX
- mobile-first layout
- polished assistant UI
- quick action chips
- responsive chat experience
- clean message bubbles
- lightweight design

### Engineering
- Express backend
- simple REST endpoint
- Groq integration ready
- MiMo-style deployment positioning ready
- demo fallback mode
- easy local run
- easy deploy path

### Quick actions included
- Summarize
- Translate
- Explain
- Rewrite

---

## Screens / flow

User flow:
1. open app
2. tap quick action or type message
3. frontend sends prompt to backend
4. backend returns demo reply or real AI response
5. UI renders assistant answer in chat thread

Architecture:

```text
User
  ↓
public/index.html
  ↓
public/app.js
  ↓
POST /api/chat
  ↓
server.js / api/chat.js
  ↓
Groq API (optional)
  ↓
Response back to UI
```

---

## Tech stack

- Node.js
- Express
- Vanilla HTML/CSS/JS
- Axios
- Groq API (optional)

Why this stack:
- fast to understand
- fast to modify
- low complexity
- ideal for prototype-to-product flow

---

## Project structure

```text
poe-ai-wrapper/
├── public/
│   ├── index.html       # main UI
│   ├── style.css        # mobile-first styling
│   └── app.js           # frontend chat logic
├── server.js            # backend API + AI provider bridge
├── package.json         # scripts + deps
├── package-lock.json
├── .env.example         # env template
├── .gitignore
└── README.md
```

---

## Local setup

### 1. Clone repo
```bash
git clone https://github.com/Anzcrypto/poe-ai-wrapper.git
cd poe-ai-wrapper
```

### 2. Install deps
```bash
npm install
```

### 3. Run app
```bash
npm start
```

### 4. Open browser
```text
http://localhost:3000
```

---

## Demo mode vs real AI mode

### Demo mode
If you run app without API key, backend returns fallback response.
Useful for:
- UI testing
- frontend demo
- deployment smoke test
- product presentation without paid setup

Example response:
```json
{
  "reply": "Echo (demo mode): hello",
  "model": "demo-mode"
}
```

### Real AI mode
If you add `GROQ_API_KEY`, backend sends prompt to Groq.

---

## Groq setup

Groq gives fast AI responses and works well for free live demos.

### 1. Create API key
Get key here:
- https://console.groq.com/keys

### 2. Create env file
```bash
cp .env.example .env
```

### 3. Edit `.env`
```env
GROQ_API_KEY=your_groq_api_key_here
PORT=3000
```

### 4. Run app with env
If shell supports inline env loading:
```bash
export GROQ_API_KEY=your_groq_api_key_here
npm start
```

Or if using `.env`, load it with your preferred env loader.

> Note: current server reads `process.env.GROQ_API_KEY` directly.
> If you want automatic `.env` loading, add `dotenv` package.

---

## Xiaomi / MiMo relevance

This repo is **not official Xiaomi MiMo API integration**.

It stays relevant for Xiaomi / MiMo style evaluation because it shows:
- mobile-first AI companion UX
- lightweight assistant flow
- live deployed AI interaction
- clean consumer-facing interface
- fast prototype-to-demo execution

Best framing for submission:
- **MiMo-style AI companion prototype**
- **mobile AI assistant product demo**
- **consumer AI interaction showcase**

If Xiaomi later opens official MiMo API access, provider layer can be swapped inside `api/chat.js` without rebuilding frontend UX from zero.

---

## API behavior

### Endpoint
```http
POST /api/chat
```

### Request body
```json
{
  "message": "Explain quantum computing simply"
}
```

### Demo mode response
```json
{
  "reply": "Echo (demo mode): Explain quantum computing simply",
  "model": "demo-mode"
}
```

### Real AI mode response
```json
{
  "reply": "Quantum computing uses quantum bits...",
  "model": "llama-3.3-70b-versatile"
}
```

---

## UI guide

### Header
Current branding:
- PocketAI
- tagline: Your AI Companion

### Quick actions
Buttons prefill common prompt patterns:
- summarize
- translate
- explain
- rewrite

This improves product feel because user does not start from blank state.

### Chat area
- bot messages left
- user messages right
- rounded mobile-friendly bubble style
- scrollable thread

### Input area
- simple text field
- send button
- mobile touch-friendly sizing

---

## How to customize

## 1. Change branding
Edit `public/index.html`:
```html
<h1>✨ PocketAI</h1>
<p>Your AI Companion</p>
```

You can rename it into:
- Mimo-style Assistant
- LiteAI Companion
- Pocket Copilot
- Mobile AI Buddy

## 2. Change colors
Edit `public/style.css`.
Search these gradients:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

Good alt palettes:
- cyan → blue
- black → gray
- orange → pink
- green → teal

## 3. Change quick actions
Edit buttons in `public/index.html`:
```html
<button class="quick-btn" data-prompt="Summarize this for me:">📝 Summarize</button>
```

Good replacements:
- Brainstorm ideas
- Fix grammar
- Write caption
- Explain code
- Translate to Indonesian
- Turn into tweet thread

## 4. Change model
Edit `server.js` and `api/chat.js`:
```js
const DEFAULT_MODEL = 'llama-3.3-70b-versatile';
```

Swap with another Groq-supported model if needed.

---

## How to make this more relevant to Xiaomi / Mimo vibe

If your angle is mobile AI companion / consumer AI product exploration, this repo is stronger when framed like this:

### Better positioning
Instead of:
- "Poe wrapper"
- "simple AI frontend"
- "chat demo"

Use:
- mobile-first AI companion prototype
- lightweight assistant interface
- consumer AI UX experiment
- minimal AI companion frontend

### Why this matters
Consumer AI products win on:
- speed
- clarity
- low friction
- mobile usability
- product feel

This repo can showcase all five if polished further.

---

## Suggested roadmap

### Phase 1 — already done
- clean UI
- quick prompts
- backend API
- AI provider hook
- demo fallback mode

### Phase 2 — strong upgrade
- model selector
- dark mode toggle
- copy response button
- prompt history
- markdown rendering
- error states

### Phase 3 — product mode
- saved chat history
- persona modes
- auth
- cloud deploy
- streaming responses
- voice input

### Phase 4 — standout portfolio build
- Android-style shell UI
- PWA install support
- multi-agent mode
- image/file input
- contextual memory

---

## Real next-step upgrades

### Upgrade 1 — dark mode
Why:
- instant premium feel
- better mobile UX

### Upgrade 2 — model selector
Why:
- feels like real AI product
- shows flexibility

### Upgrade 3 — markdown/code rendering
Why:
- much better for coding/explainer use cases

### Upgrade 4 — chat memory
Why:
- makes assistant feel persistent

### Upgrade 5 — deploy live
Why:
- public URL > local screenshot

---

## Deployment guide

### Deploy on Vercel (Recommended - No Credit Card Required)

Vercel is the easiest way to deploy this app for free without a credit card.

#### Step 1: Push to GitHub
Make sure your code is on GitHub.

#### Step 2: Import to Vercel
1. Go to https://vercel.com/new
2. Sign in with GitHub
3. Click **Import Project**
4. Select your repository: `Anzcrypto/poe-ai-wrapper`

#### Step 3: Configure Environment Variables
In the Vercel import screen:
1. Scroll to **Environment Variables**
2. Add:
   - **Name:** `GROQ_API_KEY`
   - **Value:** your Groq API key
3. Apply to: **Production** (default)

#### Step 4: Deploy
1. Click **Deploy**
2. Wait ~1-2 minutes
3. You'll get a live URL like: `https://your-project.vercel.app`

#### Step 5: Test
Open your Vercel URL and try chatting.

**Note:** This repo includes `vercel.json` and `api/chat.js` for serverless deployment. Vercel automatically detects and uses them.

---

### Deploy on Railway (Requires Credit Card)

1. Push repo to GitHub
2. Create project on Railway: https://railway.app
3. Connect your GitHub repo
4. Set environment variable:
   ```env
   GROQ_API_KEY=your_key_here
   ```
5. Deploy

**Note:** Railway requires credit card verification even for free tier.

---

### Deploy on Render (Requires Credit Card)

1. Create new Web Service: https://render.com
2. Connect GitHub repo
3. Build command:
   ```bash
   npm install
   ```
4. Start command:
   ```bash
   npm start
   ```
5. Add environment variable:
   ```env
   GROQ_API_KEY=your_key_here
   ```

**Note:** Render also requires credit card for verification.

---

### Deploy on VPS (Self-hosted)

If you have your own server:

```bash
git clone https://github.com/Anzcrypto/poe-ai-wrapper.git
cd poe-ai-wrapper
npm install
export GROQ_API_KEY=your_key_here
npm start
```

For production, use PM2:
```bash
npm install -g pm2
pm2 start server.js --name pocketai
pm2 save
pm2 startup
```

---

### Vercel vs Railway vs Render

| Platform | Free Tier | Credit Card | Serverless | Best For |
|----------|-----------|-------------|------------|----------|
| **Vercel** | ✅ Yes | ❌ Not required | ✅ Yes | Quick demos, portfolios |
| **Railway** | ✅ Yes ($5 credit) | ⚠️ Required | ❌ No | Persistent apps |
| **Render** | ✅ Yes | ⚠️ Required | ❌ No | Simple deploys |
| **VPS** | 💰 Paid | ✅ Yes | ❌ No | Full control |

**Recommendation:** Use Vercel for fastest, no-CC deployment.

---

## Add dotenv support
If you want `.env` auto-loaded:

### Install
```bash
npm install dotenv
```

### Add to `server.js`
At top:
```js
require('dotenv').config();
```

Then `.env` works directly with:
```bash
npm start
```

---

## Troubleshooting

## App starts but replies only echo
Cause:
- no `GROQ_API_KEY`
- invalid API key
- Groq request failed

Fix:
- check env var exists
- test key manually
- inspect terminal logs

## Port already used
Run:
```bash
lsof -ti:3000 | xargs kill -9
```

Or choose another port:
```bash
PORT=8080 npm start
```

## Groq errors
Check:
- key valid
- model valid
- internet access available
- request body valid

## Frontend not updating
Check browser console and terminal logs.

---

## Why this is good for portfolio

This repo shows more than code that runs.
It shows:
- interface decisions
- product framing
- AI integration readiness
- mobile-first thinking
- practical execution speed

That is much stronger than generic boilerplate.

---

## Example pitch for this repo

Use this if you want to post it on X, Discord, Telegram, or GitHub description:

> Built PocketAI Companion — lightweight mobile-first AI assistant prototype with quick prompts, polished chat UX, and OpenRouter-ready backend. Designed as product-style AI interface, not just API demo.

Short version:

> Mobile-first AI companion prototype. Clean UX, fast setup, real AI ready.

---

## Future ideas

- voice assistant mode
- translation-first mode
- student tutor mode
- creator mode
- crypto copilot mode
- Android webview packaging
- offline cache shell

---

## Credits

Built by Wowok / Anzcrypto.

If this repo helps, drop star.

---

## License

MIT
