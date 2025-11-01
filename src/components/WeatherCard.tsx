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
      <div className={`glass-card rounded-3xl p-8 group border-2`}>
        {/* Animated Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Location */}
        <div className="flex items-center gap-2 mb-6 text-white relative z-10">
          <MapPin className="w-6 h-6 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg text-shadow-soft animate-float" />
          <h2 className="text-2xl font-semibold tracking-wide text-shadow-medium">
            {weather.city}, {weather.country}
          </h2>
        </div>

        {/* Main Temperature */}
        <div className="text-center mb-8 relative z-10">
          <div className="text-9xl font-bold text-white mb-3 drop-shadow-2xl animate-pulse-slow text-shadow-strong">{weather.temp}°</div>
          <div className="text-2xl text-white capitalize font-medium tracking-wide text-shadow-medium">{weather.description}</div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6 relative z-10">
          <div className="glass-card rounded-2xl p-4 group cursor-pointer hover:shadow-elevated interactive-glow animate-fade-in text-white">
            <Droplets className="w-7 h-7 text-blue-300 mb-2 mx-auto group-hover:scale-110 transition-transform duration-300 drop-shadow-lg animate-bounce-slow" />
            <div className="text-xs mb-1 text-center font-semibold text-shadow-soft">Humidity</div>
            <div className="text-2xl font-bold text-center text-shadow-medium">{weather.humidity}%</div>
          </div>

          <div className="glass-card rounded-2xl p-4 group cursor-pointer hover:shadow-elevated interactive-glow animate-fade-in text-white" style={{animationDelay: '0.1s'}}>
            <Wind className="w-7 h-7 text-cyan-300 mb-2 mx-auto group-hover:scale-110 transition-transform duration-300 drop-shadow-lg animate-bounce-slow" style={{animationDelay: '0.2s'}} />
            <div className="text-xs mb-1 text-center font-semibold text-shadow-soft">Wind</div>
            <div className="text-2xl font-bold text-center text-shadow-medium">{weather.windSpeed} km/h</div>
          </div>

          <div className="glass-card rounded-2xl p-4 group cursor-pointer hover:shadow-elevated interactive-glow animate-fade-in text-white" style={{animationDelay: '0.2s'}}>
            <Cloud className="w-7 h-7 text-purple-300 mb-2 mx-auto group-hover:scale-110 transition-transform duration-300 drop-shadow-lg animate-bounce-slow" style={{animationDelay: '0.4s'}} />
            <div className="text-xs mb-1 text-center font-semibold text-shadow-soft">Condition</div>
            <div className="text-lg font-bold text-center text-shadow-medium">{weather.condition}</div>
          </div>
        </div>

        {/* Expandable Details Button */}
        <Button
          onClick={() => setShowDetails(!showDetails)}
          variant="ghost" // Use ghost variant to remove default styles
          /* * UPDATED THIS LINE:
           * Added specific hover style `hover:bg-white/25` to override default
           */
          className="w-full mb-4 h-14 rounded-2xl glass-card text-white/90 font-semibold transition-all flex items-center justify-center gap-2 interactive-scale relative z-10 hover:shadow-elevated hover:bg-white/25 hover:text-white/90"
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
          <div className="grid grid-cols-3 gap-4 mb-6 animate-in relative z-10">
            <div className="glass-card rounded-2xl p-4 group cursor-pointer hover:shadow-elevated interactive-glow text-white">
              <Gauge className="w-7 h-7 text-orange-300 mb-2 mx-auto group-hover:scale-110 transition-transform duration-300 drop-shadow-lg animate-bounce-slow" />
              <div className="text-xs mb-1 text-center font-semibold text-shadow-soft">Feels Like</div>
              <div className="text-2xl font-bold text-center text-shadow-medium">{weather.feelsLike}°</div>
            </div>

            <div className="glass-card rounded-2xl p-4 group cursor-pointer hover:shadow-elevated interactive-glow text-white">
              <Eye className="w-7 h-7 text-green-300 mb-2 mx-auto group-hover:scale-110 transition-transform duration-300 drop-shadow-lg animate-bounce-slow" style={{animationDelay: '0.2s'}} />
              <div className="text-xs mb-1 text-center font-semibold text-shadow-soft">Visibility</div>
              <div className="text-2xl font-bold text-center text-shadow-medium">{weather.visibility} km</div>
            </div>

            <div className="glass-card rounded-2xl p-4 group cursor-pointer hover:shadow-elevated interactive-glow text-white">
              <Gauge className="w-7 h-7 text-pink-300 mb-2 mx-auto group-hover:scale-110 transition-transform duration-300 drop-shadow-lg animate-bounce-slow" style={{animationDelay: '0.4s'}} />
              <div className="text-xs mb-1 text-center font-semibold text-shadow-soft">Pressure</div>
              <div className="text-lg font-bold text-center text-shadow-medium">{weather.pressure} hPa</div>
            </div>
          </div>
        )}

        {/* Mood Quote */}
        <div className="glass-card rounded-2xl p-6 animate-fade-in relative z-10 border-2 border-white/30 shadow-elevated hover:shadow-2xl transition-all duration-300 interactive-glow text-white">
          <div className="flex items-start gap-4">
            <span className="text-5xl animate-bounce-slow drop-shadow-2xl">{mood.emoji}</span>
            <div className="flex-1">
              <div className="text-xs text-white mb-2 font-bold tracking-wider uppercase text-shadow-soft">Clime says...</div>
              <p className="text-white text-base leading-relaxed italic font-medium text-shadow-medium">{mood.quote}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
