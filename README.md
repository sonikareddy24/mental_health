<<<<<<< HEAD
# Bridges — A Space to Feel Heard

Bridges is a multi-bot, AI-driven mental health platform. It provides a non-judgmental, entirely private space where users can converse with carefully calibrated empathetic AI companions. 

Whether you need a push (Nova), comfort (Mone), a deep listener (Atlas), perspective (Sol), or a moment of calm (Luna) — Bridges is here holding space for you 24/7.

## Core Features
1. **Multi-Personality AI Bots:** 5 deeply empathetic LLM-driven personalities powered by Google Gemini 1.5 Flash.
2. **Beautiful, Calm UI:** A soothing glassmorphic UI built to center the mind.
3. **Community Feed:** A fully interactive, dynamic masonry feed for anonymous story sharing, tagging, and supportive upvoting.
4. **Interactive Breathing Widget:** A simple 4-4-4-4 box breathing visual guide to anchor users during panic attacks.
5. **Absolute Privacy:** Your chat logs are stored strictly inside your browser's local storage and are never saved to our backend.

---

## 🚀 How to Run Locally

### 1. Requirements
- Python 3.9+ (Python 3.10+ recommended)
- A Google API Key (for Gemini access)

### 2. Setup

1. **Clone/Navigate** to the project directory:
   ```bash
   cd Bridges
   ```
2. **Setup your environment:**
   Create a virtual environment:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```
3. **Install dependencies:**
   ```bash
   pip install flask flask-cors google-generativeai
   ```
4. **Add your Gemini Key:**
   Create a `.env` file in the `chatbot` folder, or just export it in your terminal before running:
   ```bash
   export GEMINI_API_KEY="your-gemini-api-key-here"
   ```

### 3. Running the Platform

To start the platform, you need to run the Flask backend and then open the front-end in a simple server.

**Terminal 1 (Backend):**
```bash
cd chatbot
python app.py
```
*The backend will run on port 5000.*

**Terminal 2 (Frontend):**
Open a new terminal tab and navigate to the project root:
```bash
# Serves the frontend locally
python3 -m http.server 8000
```
*Now open your browser to `http://localhost:8000/index.html`*

*(Or simply double click on `index.html` in your file explorer!)*

---

*This is a companion application and is not a substitute for professional mental healthcare. Always reach out to your local crisis lines if you are in immediate danger.*
=======
# mental_health
>>>>>>> c7381777e03251b92d8c26285af3b05e0c5b1142
