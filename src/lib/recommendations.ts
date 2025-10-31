import { WeatherData } from "./weatherApi";

export interface Recommendation {
  icon: string;
  title: string;
  description: string;
  action: string;
}

export function getWeatherRecommendations(weather: WeatherData): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // Clothing recommendations
  if (weather.temp > 30) {
    recommendations.push({
      icon: "👕",
      title: "Stay Cool",
      description: "Wear light, breathable clothing",
      action: "clothing"
    });
  } else if (weather.temp < 15) {
    recommendations.push({
      icon: "🧥",
      title: "Layer Up",
      description: "Don't forget your jacket",
      action: "clothing"
    });
  } else {
    recommendations.push({
      icon: "👔",
      title: "Comfortable Weather",
      description: "Light layers should be perfect",
      action: "clothing"
    });
  }

  // Activity recommendations
  if (weather.condition === "Clear" && weather.temp > 20 && weather.temp < 30) {
    recommendations.push({
      icon: "🏃",
      title: "Perfect for Outdoors",
      description: "Great day for a walk or run",
      action: "activity"
    });
  } else if (weather.condition === "Rain") {
    recommendations.push({
      icon: "☕",
      title: "Indoor Day",
      description: "Perfect for cozy indoor activities",
      action: "activity"
    });
  } else if (weather.condition === "Clouds") {
    recommendations.push({
      icon: "🚶",
      title: "Pleasant Walk Weather",
      description: "Cool and comfortable outside",
      action: "activity"
    });
  }

  // Wind recommendations
  if (weather.windSpeed > 30) {
    recommendations.push({
      icon: "💨",
      title: "Windy Day",
      description: "Secure loose items, be cautious",
      action: "safety"
    });
  }

  // Humidity recommendations
  if (weather.humidity > 80) {
    recommendations.push({
      icon: "💧",
      title: "High Humidity",
      description: "Stay hydrated, expect sticky weather",
      action: "health"
    });
  } else if (weather.humidity < 30) {
    recommendations.push({
      icon: "🥤",
      title: "Dry Air",
      description: "Keep moisturized and drink water",
      action: "health"
    });
  }

  // Visibility recommendations
  if (weather.visibility < 3) {
    recommendations.push({
      icon: "🚗",
      title: "Low Visibility",
      description: "Drive carefully, use headlights",
      action: "safety"
    });
  }

  return recommendations.slice(0, 4); // Return max 4 recommendations
}
