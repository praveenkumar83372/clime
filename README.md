# 🌤️ Clime — Your Personal Sky Companion

> Not just a weather app — a mood experience that feels the sky with you.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Click_Here-blue)](https://praveenkumar83372.github.io/clime/)

## ✨ Overview

**Clime** is a modern, emotionally engaging **weather companion app** that transforms everyday weather data into **personal mood reflections**.  
Whether it’s rain, sunshine, or a cloudy day — Clime interprets the sky as an emotional landscape, offering **smart insights, beautiful visuals, and an intuitive voice interface**.

This project reflects my passion for **UI/UX design**, **frontend development**, and **emotion-driven digital experiences**.


## 🌈 Core Features

| Category | Feature | Description |
|-----------|----------|-------------|
| ☀️ Weather | **Real-time Display** | Dynamic backgrounds that match the live weather. |
| 📅 Forecast | **5-Day Carousel** | Interactive cards that make weather browsing simple and fun. |
| 💫 Mood Engine | **Emotion Mapping** | Converts “Rain” → “Cozy”, “Clear” → “Cheerful”, etc. |
| 🗣️ Voice | **Conversation Mode** | Talk to Clime through built-in speech recognition. |
| 🌍 Languages | **Multi-language Support** | English, Tamil, Hindi, Telugu & Malayalam. |
| 👕 Smart Tips | **Recommendations** | Suggests outfits, indoor/outdoor activities, and mood music ideas. |
| 📍 Geo Smart | **Auto Location Detection** | Instantly fetches weather for your current place. |
| 🔍 Explore | **City Search** | Get weather data for any city worldwide. |
| 💎 Design | **Glassmorphism UI** | Modern, smooth, and emotion-based visual experience. |



## 🛠️ Tech Stack

| Area | Technology |
|------|-------------|
| **Frontend** | React + TypeScript + Vite |
| **Styling** | TailwindCSS + Shadcn/UI |
| **APIs** | OpenWeatherMap |
| **Voice Engine** | Web Speech API (Recognition + Synthesis) |
| **State Management** | React Hooks + LocalStorage |
| **Deployment** | GitHub Pages + GitHub Actions |



## 🧭 Setup Guide

### 1️⃣ Get Your OpenWeatherMap API Key

1. Visit [OpenWeatherMap API](https://openweathermap.org/api)
2. Sign up and navigate to **API Keys**
3. Copy your personal API key

### 2️⃣ Configure `.env`

cp .env.example .env
Then open .env and paste your key:

ini

VITE_OPENWEATHER_API_KEY=your_api_key_here
3️⃣ Run Locally

# Clone the repository
git clone https://github.com/praveenkumar83372/clime.git

# Enter the directory
cd clime

# Install dependencies


# Run development server
🚀 Deployment
Clime is pre-configured for GitHub Pages, but can also be hosted on Vercel or Netlify.

🧩 Environment Variable for Deployment
makefile
Copy code
Key: VITE_OPENWEATHER_API_KEY
Value: your_api_key_here
(Your .env is ignored via .gitignore for safety.)

📁 Folder Structure
src/
├── assets/             # Backgrounds & icons
├── components/         # Reusable UI blocks
│   └── ui/             # Shadcn components
├── lib/                # Helper modules (moodEngine, weatherApi)
└── pages/              # Main pages (Index.tsx)

🎨 Design Philosophy
“Weather isn’t just numbers — it’s a feeling.”
Clime’s design focuses on emotional storytelling through UI:
Soft glassmorphism cards that reflect calmness
Smooth weather transitions that mirror mood shifts
Voice interactions that make the app feel alive
A warm, multilingual touch for inclusivity
This project embodies my goal of bridging technology and emotion through human-centered design.

🤝 Contributing
Pull requests are welcome!
If you’d like to enhance Clime’s features or design, feel free to fork and contribute.

Fork this repository
Create a feature branch
Commit your changes
Push and submit a PR 🚀

📜 License
Licensed under the MIT License — free for personal and commercial use.

💖 Credits
Weather Data: OpenWeatherMap
Icons: Lucide React
UI Library: Shadcn/UI
Made with ❤️ by Praveen Kumar

🌤️ Final Thought
"Clime is more than an app — it’s how you feel the weather."
Designed & developed with passion for those who believe technology can have a heart. 💙








