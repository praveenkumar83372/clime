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

  return (
    <div className="relative w-full max-w-lg mx-auto animate-scale-in">
      {/* Glass Card */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
        {/* Location */}
        <div className="flex items-center gap-2 mb-6 text-white/90">
          <MapPin className="w-5 h-5" />
          <h2 className="text-xl font-medium">
            {weather.city}, {weather.country}
          </h2>
        </div>

        {/* Main Temperature */}
        <div className="text-center mb-8">
          <div className="text-8xl font-bold text-white mb-2">{weather.temp}°</div>
          <div className="text-2xl text-white/80 capitalize">{weather.description}</div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm">
            <Droplets className="w-6 h-6 text-white/70 mb-2" />
            <div className="text-sm text-white/60">Humidity</div>
            <div className="text-xl font-semibold text-white">{weather.humidity}%</div>
          </div>

          <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm">
            <Wind className="w-6 h-6 text-white/70 mb-2" />
            <div className="text-sm text-white/60">Wind</div>
            <div className="text-xl font-semibold text-white">{weather.windSpeed} km/h</div>
          </div>

          <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm">
            <Cloud className="w-6 h-6 text-white/70 mb-2" />
            <div className="text-sm text-white/60">Condition</div>
            <div className="text-xl font-semibold text-white">{weather.condition}</div>
          </div>
        </div>

        {/* Expandable Details */}
        <Button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full mb-4 h-12 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 transition-all flex items-center justify-center gap-2"
        >
          {showDetails ? (
            <>
              <ChevronUp className="w-5 h-5" />
              <span>Hide Details</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-5 h-5" />
              <span>More Details</span>
            </>
          )}
        </Button>

        {showDetails && (
          <div className="grid grid-cols-3 gap-4 mb-6 animate-fade-in">
            <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm">
              <Gauge className="w-6 h-6 text-white/70 mb-2" />
              <div className="text-sm text-white/60">Feels Like</div>
              <div className="text-xl font-semibold text-white">{weather.feelsLike}°</div>
            </div>

            <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm">
              <Eye className="w-6 h-6 text-white/70 mb-2" />
              <div className="text-sm text-white/60">Visibility</div>
              <div className="text-xl font-semibold text-white">{weather.visibility} km</div>
            </div>

            <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm">
              <Gauge className="w-6 h-6 text-white/70 mb-2" />
              <div className="text-sm text-white/60">Pressure</div>
              <div className="text-xl font-semibold text-white">{weather.pressure} hPa</div>
            </div>
          </div>
        )}

        {/* Mood Quote */}
        <div className="p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 animate-fade-in">
          <div className="flex items-start gap-3">
            <span className="text-3xl animate-pulse-glow">{mood.emoji}</span>
            <div>
              <div className="text-xs text-white/50 mb-1">Clime says...</div>
              <p className="text-white/90 leading-relaxed">{mood.quote}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
