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
      <h3 className="text-white text-2xl font-bold mb-5 text-center text-shadow-medium">5-Day Forecast</h3>
      
      <div className="relative glass-card rounded-3xl p-8 shadow-elevated border-2">
        {/* Carousel */}
        <div className="flex items-center justify-between gap-6">
          <Button
            onClick={prev}
            size="icon"
            /* * UPDATED THIS LINE:
             * Added "text-white hover:bg-white hover:text-black"
             */
            className="rounded-full glass-card w-12 h-12 flex-shrink-0 interactive-glow hover:shadow-lg hover:animate-wiggle text-white hover:bg-white hover:text-black"
          >
            <ChevronLeft className="w-6 h-6 drop-shadow-lg" />
          </Button>

          <div className="flex-1 text-center animate-scale-in">
            <div className="text-white text-base font-bold mb-3 tracking-wide text-shadow-soft">{forecast[currentIndex].date}</div>
            <div className="text-7xl mb-4 transform hover:scale-110 transition-transform duration-300 animate-bounce-slow drop-shadow-2xl">
              {forecast[currentIndex].icon.endsWith('d') ? '☀️' : '🌙'}
            </div>
            <div className="text-5xl font-bold text-white mb-2 text-shadow-strong">
              {forecast[currentIndex].temp}°
            </div>
            <div className="text-white capitalize mb-3 text-lg font-medium text-shadow-medium">{forecast[currentIndex].description}</div>
            <div className="flex justify-center gap-4 text-white text-base font-bold">
              {/* * UPDATED THIS LINE:
               * Added "text-white hover:bg-white hover:text-black"
               */}
              <span className="glass-card px-4 py-2 rounded-full interactive-glow text-shadow-soft text-white hover:bg-white hover:text-black">↑ {forecast[currentIndex].tempMax}°</span>
              {/* * UPDATED THIS LINE:
               * Added "text-white hover:bg-white hover:text-black"
               */}
              <span className="glass-card px-4 py-2 rounded-full interactive-glow text-shadow-soft text-white hover:bg-white hover:text-black">↓ {forecast[currentIndex].tempMin}°</span>
            </div>
          </div>

          <Button
            onClick={next}
            size="icon"
            /* * UPDATED THIS LINE:
             * Added "text-white hover:bg-white hover:text-black"
             */
            className="rounded-full glass-card w-12 h-12 flex-shrink-0 interactive-glow hover:shadow-lg hover:animate-wiggle text-white hover:bg-white hover:text-black"
          >
            <ChevronRight className="w-6 h-6 text-white drop-shadow-lg" />
          </Button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-3 mt-6">
          {forecast.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 interactive-glow hover:animate-pop ${
                index === currentIndex ? "bg-white w-8 shadow-lg" : "bg-white/50 w-2.5 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
