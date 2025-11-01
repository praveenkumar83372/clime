import { WeatherData } from "@/lib/weatherApi";
import { getWeatherRecommendations } from "@/lib/recommendations";

interface WeatherRecommendationsProps {
  weather: WeatherData;
}

export function WeatherRecommendations({ weather }: WeatherRecommendationsProps) {
  const recommendations = getWeatherRecommendations(weather);

  return (
    <div className="w-full max-w-lg mx-auto mb-6 animate-fade-in">
      <h3 className="text-white text-2xl font-bold mb-5 text-center text-shadow-medium">Recommendations</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="glass-card rounded-2xl p-5 shadow-elevated interactive-glow cursor-pointer group animate-scale-in border-2 hover:animate-pop"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 drop-shadow-2xl animate-bounce-slow">{rec.icon}</div>
            <div className="text-white font-bold text-base mb-2 text-shadow-medium">{rec.title}</div>
            <div className="text-white text-sm leading-relaxed text-shadow-soft">{rec.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
