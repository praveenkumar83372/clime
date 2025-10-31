import { useEffect, useState } from "react";
import sunnyBg from "@/assets/sunny-bg.jpg";
import rainyBg from "@/assets/rainy-bg.jpg";
import cloudyBg from "@/assets/cloudy-bg.jpg";
import nightBg from "@/assets/night-bg.jpg";
import clearBg from "@/assets/clear-bg.jpg";

interface BackgroundSceneProps {
  background: string;
}

const backgrounds: Record<string, string> = {
  sunny: sunnyBg,
  rainy: rainyBg,
  cloudy: cloudyBg,
  night: nightBg,
  clear: clearBg,
};

export function BackgroundScene({ background }: BackgroundSceneProps) {
  const [currentBg, setCurrentBg] = useState(background);

  useEffect(() => {
    setCurrentBg(background);
  }, [background]);

  return (
    <div className="fixed inset-0 -z-10 transition-opacity duration-1000">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${backgrounds[currentBg] || backgrounds.clear})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
    </div>
  );
}
