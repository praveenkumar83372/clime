export interface MoodData {
  mood: string;
  quote: string;
  emoji: string;
  background: string;
  color: string;
}

const moodMap: Record<string, MoodData> = {
  Clear: {
    mood: "cheerful",
    quote: "Bright sunshine ☀️ — let's make it a productive one!",
    emoji: "☀️",
    background: "clear",
    color: "clear",
  },
  Clouds: {
    mood: "calm",
    quote: "Hey, the clouds are feeling lazy today ☁️ — maybe take it slow too.",
    emoji: "☁️",
    background: "cloudy",
    color: "cloudy",
  },
  Rain: {
    mood: "cozy",
    quote: "Soft drizzle outside 🌧️ — perfect time for chai and chill.",
    emoji: "🌧️",
    background: "rainy",
    color: "rainy",
  },
  Drizzle: {
    mood: "peaceful",
    quote: "Light drops are falling 🌦️ — let's embrace the calm.",
    emoji: "🌦️",
    background: "rainy",
    color: "rainy",
  },
  Thunderstorm: {
    mood: "intense",
    quote: "Thunder roaring ⛈️ — nature's powerful symphony!",
    emoji: "⛈️",
    background: "rainy",
    color: "rainy",
  },
  Snow: {
    mood: "magical",
    quote: "Snowflakes dancing ❄️ — winter's gentle whisper.",
    emoji: "❄️",
    background: "cloudy",
    color: "cloudy",
  },
  Mist: {
    mood: "mysterious",
    quote: "Misty morning 🌫️ — secrets hiding in the fog.",
    emoji: "🌫️",
    background: "cloudy",
    color: "cloudy",
  },
  Haze: {
    mood: "dreamy",
    quote: "Hazy afternoon 🌫️ — everything feels like a dream.",
    emoji: "🌫️",
    background: "cloudy",
    color: "cloudy",
  },
};

export function getMoodFromWeather(condition: string, isNight: boolean = false): MoodData {
  if (isNight) {
    return {
      mood: "serene",
      quote: "Stars are whispering 🌙 — time to rest and recharge.",
      emoji: "🌙",
      background: "night",
      color: "night",
    };
  }

  return moodMap[condition] || moodMap.Clear;
}

export function isNightTime(icon: string): boolean {
  return icon.endsWith("n");
}
