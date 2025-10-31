import { useState, useEffect } from "react";
import { fetchWeather, fetchWeatherByCoords, WeatherData, fetchForecast, ForecastDay } from "@/lib/weatherApi";
import { getMoodFromWeather, isNightTime, MoodData } from "@/lib/moodEngine";
import { BackgroundScene } from "@/components/BackgroundScene";
import { WeatherCard } from "@/components/WeatherCard";
import { SearchBar } from "@/components/SearchBar";
import { ControlsBar } from "@/components/ControlsBar";
import { VoiceConversation } from "@/components/VoiceConversation";
import { SettingsModal } from "@/components/SettingsModal";
import { ForecastCarousel } from "@/components/ForecastCarousel";
import { QuickActions } from "@/components/QuickActions";
import { WeatherRecommendations } from "@/components/WeatherRecommendations";
import { Language, detectBrowserLanguage, translate } from "@/lib/translations";
import { toast } from "sonner";

const Index = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [mood, setMood] = useState<MoodData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [isDark, setIsDark] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [showVoice, setShowVoice] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [savedCities, setSavedCities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load saved preferences
    const savedLang = localStorage.getItem("clime-language") as Language;
    const savedCitiesList = localStorage.getItem("clime-cities");
    
    if (savedLang) setLanguage(savedLang);
    else setLanguage(detectBrowserLanguage());
    
    if (savedCitiesList) setSavedCities(JSON.parse(savedCitiesList));

    // Get initial location
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const data = await fetchWeatherByCoords(
              position.coords.latitude,
              position.coords.longitude
            );
            updateWeather(data);
          } catch (error) {
            toast.error("Could not fetch weather for your location");
            loadDefaultCity();
          }
        },
        () => {
          loadDefaultCity();
        }
      );
    } else {
      loadDefaultCity();
    }
  };

  const loadDefaultCity = async () => {
    try {
      const data = await fetchWeather("London");
      updateWeather(data);
    } catch (error) {
      toast.error("Could not load weather data");
      setIsLoading(false);
    }
  };

  const updateWeather = async (data: WeatherData) => {
    setWeather(data);
    const isNight = isNightTime(data.icon);
    const moodData = getMoodFromWeather(data.condition, isNight);
    setMood(moodData);
    setIsLoading(false);

    // Fetch forecast data
    try {
      const forecastData = await fetchForecast(data.city);
      setForecast(forecastData);
    } catch (error) {
      console.error("Could not fetch forecast:", error);
    }

    // Save city if not already saved
    if (!savedCities.includes(data.city)) {
      const newCities = [...savedCities, data.city];
      setSavedCities(newCities);
      localStorage.setItem("clime-cities", JSON.stringify(newCities));
    }
  };

  const handleSearch = async (city: string) => {
    try {
      setIsLoading(true);
      const data = await fetchWeather(city);
      updateWeather(data);
      toast.success(`Loaded weather for ${data.city}`);
    } catch (error) {
      toast.error("City not found. Please try again.");
      setIsLoading(false);
    }
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("clime-language", lang);
    toast.success("Language updated");
  };

  const handleCityRemove = (city: string) => {
    const newCities = savedCities.filter((c) => c !== city);
    setSavedCities(newCities);
    localStorage.setItem("clime-cities", JSON.stringify(newCities));
    toast.success("City removed");
  };

  const handleShare = () => {
    if (weather && mood) {
      const shareText = `${mood.emoji} ${weather.temp}° in ${weather.city}\n${mood.quote}\n\n- Clime: Your Personal Sky Companion`;
      
      if (navigator.share) {
        navigator.share({ text: shareText }).catch(() => {});
      } else {
        navigator.clipboard.writeText(shareText);
        toast.success("Weather copied to clipboard!");
      }
    }
  };

  if (isLoading || !weather || !mood) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="text-white text-2xl animate-pulse">Loading Clime...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative overflow-hidden ${isDark ? "dark" : ""}`}>
      <BackgroundScene background={mood.background} />

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">Clime</h1>
          <p className="text-white/80 text-lg">{translate("tagline", language)}</p>
        </div>

        {/* Search Bar */}
        <SearchBar
          onSearch={handleSearch}
          onLocationRequest={getCurrentLocation}
          placeholder={translate("search", language)}
        />

        {/* Weather Card */}
        <WeatherCard weather={weather} mood={mood} />

        {/* Quick Actions */}
        <QuickActions 
          weather={weather} 
          onAskClime={(question) => {
            // Optional: could open voice conversation with pre-filled question
            console.log("User asked:", question);
          }} 
        />

        {/* Weather Recommendations */}
        <WeatherRecommendations weather={weather} />

        {/* Forecast Carousel */}
        {forecast.length > 0 && <ForecastCarousel forecast={forecast} />}

        {/* Controls Bar */}
        <ControlsBar
          isDark={isDark}
          onThemeToggle={() => setIsDark(!isDark)}
          isSoundOn={isSoundOn}
          onSoundToggle={() => setIsSoundOn(!isSoundOn)}
          onVoiceClick={() => setShowVoice(true)}
          onShareClick={handleShare}
          onSettingsClick={() => setShowSettings(true)}
        />
      </main>

      {/* Modals */}
      {showVoice && (
        <VoiceConversation
          onClose={() => setShowVoice(false)}
          weatherCondition={weather.condition}
          mood={mood.mood}
        />
      )}

      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
          language={language}
          onLanguageChange={handleLanguageChange}
          savedCities={savedCities}
          onCityAdd={handleSearch}
          onCityRemove={handleCityRemove}
        />
      )}
    </div>
  );
};

export default Index;
