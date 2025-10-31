import { ForecastDay } from "@/lib/weatherApi";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ForecastCarouselProps {
  forecast: ForecastDay[];
}

export function ForecastCarousel({ forecast }: ForecastCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % forecast.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + forecast.length) % forecast.length);
  };

  if (!forecast.length) return null;

  return (
    <div className="w-full max-w-lg mx-auto mb-6 animate-fade-in">
      <h3 className="text-white/90 text-lg font-semibold mb-3 text-center">5-Day Forecast</h3>
      
      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-xl">
        {/* Carousel */}
        <div className="flex items-center justify-between gap-4">
          <Button
            onClick={prev}
            size="icon"
            className="rounded-full bg-white/10 hover:bg-white/20 border-0 w-10 h-10 flex-shrink-0 transition-all hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </Button>

          <div className="flex-1 text-center animate-scale-in">
            <div className="text-white/70 text-sm mb-2">{forecast[currentIndex].date}</div>
            <div className="text-6xl mb-2">
              {forecast[currentIndex].icon.endsWith('d') ? '☀️' : '🌙'}
            </div>
            <div className="text-4xl font-bold text-white mb-1">
              {forecast[currentIndex].temp}°
            </div>
            <div className="text-white/80 capitalize mb-2">{forecast[currentIndex].description}</div>
            <div className="flex justify-center gap-2 text-white/60 text-sm">
              <span>↑ {forecast[currentIndex].tempMax}°</span>
              <span>↓ {forecast[currentIndex].tempMin}°</span>
            </div>
          </div>

          <Button
            onClick={next}
            size="icon"
            className="rounded-full bg-white/10 hover:bg-white/20 border-0 w-10 h-10 flex-shrink-0 transition-all hover:scale-110"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </Button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {forecast.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-white w-6" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
