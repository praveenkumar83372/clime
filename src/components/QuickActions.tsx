import { Shirt, Coffee, Umbrella, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WeatherData } from "@/lib/weatherApi";
import { toast } from "sonner";

interface QuickActionsProps {
  weather: WeatherData;
  onAskClime: (question: string) => void;
}

export function QuickActions({ weather, onAskClime }: QuickActionsProps) {
  const actions = [
    {
      icon: Shirt,
      label: "What to wear?",
      action: () => {
        const temp = weather.temp;
        let response = "";
        if (temp > 30) {
          response = "Light, breathable clothes! ☀️ Stay cool in cotton or linen.";
        } else if (temp > 20) {
          response = "Comfortable casual wear should be perfect! 👕 Maybe light layers.";
        } else if (temp > 10) {
          response = "Layer up! 🧥 A light jacket should keep you comfy.";
        } else {
          response = "Bundle up warm! 🧣 Winter jacket and layers recommended.";
        }
        toast.success(response);
        onAskClime("What should I wear today?");
      }
    },
    {
      icon: Umbrella,
      label: "Need umbrella?",
      action: () => {
        const condition = weather.condition.toLowerCase();
        const needUmbrella = condition.includes("rain") || condition.includes("drizzle") || condition.includes("thunderstorm");
        const response = needUmbrella 
          ? "Yes! ☔ Don't forget your umbrella today." 
          : "Nope! 🌤️ Leave it at home, you're good.";
        toast.success(response);
        onAskClime("Do I need an umbrella?");
      }
    },
    {
      icon: Coffee,
      label: "Good for outdoors?",
      action: () => {
        const temp = weather.temp;
        const condition = weather.condition;
        let response = "";
        
        if (condition === "Clear" && temp > 15 && temp < 32) {
          response = "Perfect! ☀️ Great day for outdoor activities.";
        } else if (condition === "Clouds" && temp > 10) {
          response = "Pretty nice! ☁️ Good for a walk or casual outing.";
        } else if (condition === "Rain") {
          response = "Not really. 🌧️ Better stay cozy indoors today.";
        } else if (temp > 35) {
          response = "Too hot! 🥵 Maybe wait for evening or stay indoors.";
        } else {
          response = "It's okay, but not ideal. 🤔 Dress accordingly!";
        }
        
        toast.success(response);
        onAskClime("Is it good for outdoor activities?");
      }
    },
    {
      icon: Wind,
      label: "Wind status?",
      action: () => {
        const wind = weather.windSpeed;
        let response = "";
        
        if (wind < 10) {
          response = "Calm winds! 🍃 Very pleasant conditions.";
        } else if (wind < 25) {
          response = "Moderate breeze. 💨 Nothing to worry about.";
        } else if (wind < 40) {
          response = "Getting windy! 🌬️ Secure loose items.";
        } else {
          response = "Very windy! 🌪️ Be careful, especially outdoors.";
        }
        
        toast.success(response);
        onAskClime("How windy is it?");
      }
    }
  ];

  return (
    <div className="w-full max-w-lg mx-auto mb-6 animate-slide-up">
      <h3 className="text-white/90 text-lg font-semibold mb-3 text-center">Quick Questions</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            onClick={action.action}
            className="h-auto py-4 px-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-xl transition-all hover:scale-105 flex flex-col items-center gap-2"
          >
            <action.icon className="w-6 h-6 text-white" />
            <span className="text-white text-sm font-medium">{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
