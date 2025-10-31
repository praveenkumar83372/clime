import { WeatherData } from "@/lib/weatherApi";
import { getWeatherRecommendations } from "@/lib/recommendations";

interface WeatherRecommendationsProps {
  weather: WeatherData;
}

export function WeatherRecommendations({ weather }: WeatherRecommendationsProps) {
  const recommendations = getWeatherRecommendations(weather);

  return (
    <div className="w-full max-w-lg mx-auto mb-6 animate-fade-in">
      <h3 className="text-white/90 text-lg font-semibold mb-3 text-center">Recommendations</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4 shadow-lg hover:bg-white/15 transition-all hover:scale-105 cursor-pointer animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-3xl mb-2">{rec.icon}</div>
            <div className="text-white font-semibold text-sm mb-1">{rec.title}</div>
            <div className="text-white/70 text-xs">{rec.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
