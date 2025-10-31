# Clime - Your Personal Sky Companion 🌤️

A modern, emotionally engaging weather companion app that blends AI, weather data, and mood interpretation to create a personalized experience.

**URL**: https://lovable.dev/projects/55873ed3-e6ec-429c-85fc-801d640f94d7

## Features ✨

- **Real-time Weather Display** - Current weather conditions with beautiful visuals
- **5-Day Forecast** - Interactive carousel showing upcoming weather
- **Mood Engine** - Converts weather conditions into emotional experiences
- **Quick Actions** - Get instant answers to common weather questions
- **Smart Recommendations** - Personalized suggestions based on current weather
- **Voice Conversation** - Talk to Clime using speech recognition
- **Multi-language Support** - English, Tamil, Hindi, Telugu, Malayalam
- **Dark/Light Mode** - Adaptive theming
- **Location Detection** - Automatic location-based weather
- **City Search** - Find weather for any city worldwide
- **Shareable Weather Cards** - Share your current weather experience

## Tech Stack 🛠️

- **Frontend**: React + TypeScript + Vite
- **Styling**: TailwindCSS with glassmorphism design
- **Weather API**: OpenWeatherMap
- **Voice**: Web Speech API (Speech Recognition & Synthesis)
- **State**: React Hooks + LocalStorage

## Setup Instructions 🚀

### 1. Get Your OpenWeatherMap API Key

1. Visit [OpenWeatherMap API](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to "API keys" in your account
4. Copy your API key

### 2. Configure Environment Variables

**For Lovable Deployment:**
1. Go to Project Settings → Environment Variables
2. Add: `VITE_OPENWEATHER_API_KEY` with your API key value

**For Local Development:**
1. Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
2. Add your OpenWeatherMap API key:
   ```
   VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
   ```

### 3. Local Development

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

## Deployment 🌐

### Deploy with Lovable (Recommended)

1. Open [Lovable](https://lovable.dev/projects/55873ed3-e6ec-429c-85fc-801d640f94d7)
2. Click on **Share → Publish**
3. Add environment variable in Project Settings:
   - Key: `VITE_OPENWEATHER_API_KEY`
   - Value: Your OpenWeatherMap API key

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variable: `VITE_OPENWEATHER_API_KEY`
4. Deploy

### Deploy to Netlify

1. Push your code to GitHub
2. Connect repository in Netlify
3. Add environment variable: `VITE_OPENWEATHER_API_KEY`
4. Deploy

## Environment Variables 🔐

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_OPENWEATHER_API_KEY` | Your OpenWeatherMap API key | Yes |

**Important**: Never commit your `.env` file to version control. It's already included in `.gitignore`.

## Browser Support 🌐

- **Voice Features**: Chrome, Edge, Safari (iOS 14.5+)
- **Core Features**: All modern browsers
- **Speech Recognition**: Limited to browsers with Web Speech API support

## Custom Domain 🌍

To connect a custom domain:
1. Navigate to Project > Settings > Domains
2. Click "Connect Domain"
3. Follow the setup instructions

Read more: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## API Rate Limits ⚠️

OpenWeatherMap free tier includes:
- 60 calls/minute
- 1,000,000 calls/month

The app makes approximately:
- 1 call on load
- 1 call per city search
- 1 call per forecast request

## Project Structure 📁

```
src/
├── components/          # React components
├── lib/                # Utilities and services
├── pages/              # Route pages
└── assets/             # Static assets
```

## Contributing 🤝

Contributions are welcome! Feel free to edit via:
- **Lovable**: Direct prompting in the editor
- **GitHub**: Edit files directly or use Codespaces
- **Local IDE**: Clone, edit, and push changes

## License 📄

MIT License - feel free to use this project for personal or commercial purposes.

## Credits 🙏

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons from [Lucide React](https://lucide.dev/)
- Built with [Lovable](https://lovable.dev/)

---

Made with ❤️ using Lovable - Your Personal Sky Companion
