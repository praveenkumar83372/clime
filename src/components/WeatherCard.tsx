import { Cloud, Droplets, Wind, MapPin, Eye, Gauge, ChevronDown, ChevronUp } from "lucide-react";
import { WeatherData } from "@/lib/weatherApi";
import { MoodData } from "@/lib/moodEngine";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface WeatherCardProps {
  weather: WeatherData;
  mood: MoodData;
}

export function WeatherCard({ weather, mood }: WeatherCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const getMoodGradient = () => {
    if (mood.mood === "cheerful") return "from-yellow-400/20 to-orange-400/20";
    if (mood.mood === "cozy") return "from-blue-400/20 to-indigo-400/20";
    if (mood.mood === "calm") return "from-purple-400/20 to-pink-400/20";
    if (mood.mood === "peaceful") return "from-cyan-400/20 to-blue-400/20";
    if (mood.mood === "mysterious") return "from-indigo-500/20 to-purple-600/20";
    return "from-white/10 to-white/5";
  };

  return (
    <div className="relative w-full max-w-lg mx-auto animate-scale-in">
      {/* Glass Card */}
      <div className={`glass-card rounded-3xl p-8 group bg-gradient-to-br ${getMoodGradient()} border-2`}>
        {/* Animated Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Location */}
        <div className="flex items-center gap-2 mb-6 text-white/90 relative z-10">
          <MapPin className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
          <h2 className="text-2xl font-semibold tracking-wide">
            {weather.city}, {weather.country}
          </h2>
        </div>

        {/* Main Temperature */}
        <div className="text-center mb-8 relative z-10">
          <div className="text-9xl font-bold text-white mb-3 text-gradient drop-shadow-2xl animate-pulse-slow">{weather.temp}°</div>
          <div className="text-2xl text-white/90 capitalize font-medium tracking-wide">{weather.description}</div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6 relative z-10">
          <div className="glass-card rounded-2xl p-4 group cursor-pointer">
            <Droplets className="w-7 h-7 text-blue-300 mb-2 mx-auto group-hover:scale-110 transition-transform duration-300" />
            <div className="text-xs text-white/70 mb-1 text-center">Humidity</div>
            <div className="text-2xl font-bold text-white text-center">{weather.humidity}%</div>
          </div>

          <div className="glass-card rounded-2xl p-4 group cursor-pointer">
            <Wind className="w-7 h-7 text-cyan-300 mb-2 mx-auto group-hover:scale-110 transition-transform duration-300" />
            <div className="text-xs text-white/70 mb-1 text-center">Wind</div>
            <div className="text-2xl font-bold text-white text-center">{weather.windSpeed} km/h</div>
          </div>

          <div className="glass-card rounded-2xl p-4 group cursor-pointer">
            <Cloud className="w-7 h-7 text-purple-300 mb-2 mx-auto group-hover:scale-110 transition-transform duration-300" />
            <div className="text-xs text-white/70 mb-1 text-center">Condition</div>
            <div className="text-lg font-bold text-white text-center">{weather.condition}</div>
          </div>
        </div>

        {/* Expandable Details */}
        <Button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full mb-4 h-14 rounded-2xl glass-card text-white/90 font-semibold transition-all flex items-center justify-center gap-2 interactive-scale relative z-10 hover:shadow-elevated"
        >
          {showDetails ? (
            <>
              <ChevronUp className="w-6 h-6" />
              <span>Hide Details</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-6 h-6" />
              <span>More Details</span>
            </>
          )}
        </Button>

        {showDetails && (
          <div className="grid grid-cols-3 gap-4 mb-6 animate-fade-in relative z-10">
            <div className="glass-card rounded-2xl p-4 group cursor-pointer">
              <Gauge className="w-7 h-7 text-orange-300 mb-2 mx-auto group-hover:scale-110 transition-transform duration-300" />
              <div className="text-xs text-white/70 mb-1 text-center">Feels Like</div>
              <div className="text-2xl font-bold text-white text-center">{weather.feelsLike}°</div>
            </div>

            <div className="glass-card rounded-2xl p-4 group cursor-pointer">
              <Eye className="w-7 h-7 text-green-300 mb-2 mx-auto group-hover:scale-110 transition-transform duration-300" />
              <div className="text-xs text-white/70 mb-1 text-center">Visibility</div>
              <div className="text-2xl font-bold text-white text-center">{weather.visibility} km</div>
            </div>

            <div className="glass-card rounded-2xl p-4 group cursor-pointer">
              <Gauge className="w-7 h-7 text-pink-300 mb-2 mx-auto group-hover:scale-110 transition-transform duration-300" />
              <div className="text-xs text-white/70 mb-1 text-center">Pressure</div>
              <div className="text-lg font-bold text-white text-center">{weather.pressure} hPa</div>
            </div>
          </div>
        )}

        {/* Mood Quote */}
        <div className="glass-card rounded-2xl p-6 animate-fade-in relative z-10 border-2 border-white/30 shadow-elevated hover:shadow-2xl transition-all duration-300 interactive-scale">
          <div className="flex items-start gap-4">
            <span className="text-5xl animate-pulse">{mood.emoji}</span>
            <div className="flex-1">
              <div className="text-xs text-white/60 mb-2 font-semibold tracking-wider uppercase">Clime says...</div>
              <p className="text-white text-base leading-relaxed italic font-medium">{mood.quote}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
