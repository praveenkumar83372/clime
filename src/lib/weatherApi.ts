export interface WeatherData {
  city: string;
  temp: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  country: string;
  feelsLike: number;
  pressure: number;
  visibility: number;
}

export interface ForecastDay {
  date: string;
  temp: number;
  tempMin: number;
  tempMax: number;
  condition: string;
  icon: string;
  description: string;
}

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || "bd5e378503939ddaee76f12ad7a97608";

export async function fetchWeather(city: string): Promise<WeatherData> {
  if (!API_KEY || API_KEY === "your_api_key_here") {
    throw new Error("OpenWeatherMap API key is not configured. Please add VITE_OPENWEATHER_API_KEY to your environment variables.");
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("City not found. Please check the spelling and try again.");
    } else if (response.status === 401) {
      throw new Error("Invalid API key. Please check your OpenWeatherMap API key.");
    } else if (response.status === 429) {
      throw new Error("Too many requests. Please try again in a few minutes.");
    }
    throw new Error("Unable to fetch weather data. Please try again later.");
  }

  const data = await response.json();

  return {
    city: data.name,
    temp: Math.round(data.main.temp),
    condition: data.weather[0].main,
    description: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
    icon: data.weather[0].icon,
    country: data.sys.country,
    feelsLike: Math.round(data.main.feels_like),
    pressure: data.main.pressure,
    visibility: Math.round(data.visibility / 1000), // Convert to km
  };
}

export async function fetchWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  if (!API_KEY || API_KEY === "your_api_key_here") {
    throw new Error("OpenWeatherMap API key is not configured.");
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Invalid API key.");
    } else if (response.status === 429) {
      throw new Error("Too many requests. Please try again later.");
    }
    throw new Error("Unable to fetch weather for your location.");
  }

  const data = await response.json();

  return {
    city: data.name,
    temp: Math.round(data.main.temp),
    condition: data.weather[0].main,
    description: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 3.6),
    icon: data.weather[0].icon,
    country: data.sys.country,
    feelsLike: Math.round(data.main.feels_like),
    pressure: data.main.pressure,
    visibility: Math.round(data.visibility / 1000),
  };
}

export async function fetchForecast(city: string): Promise<ForecastDay[]> {
  if (!API_KEY || API_KEY === "your_api_key_here") {
    return []; // Silently fail for forecast if API key is missing
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      console.warn("Unable to fetch forecast data");
      return [];
    }

    const data = await response.json();
  
  // Group by day and get one forecast per day (noon time preferred)
  const dailyForecasts: ForecastDay[] = [];
  const processedDates = new Set<string>();

  for (const item of data.list) {
    const date = new Date(item.dt * 1000);
    const dateStr = date.toLocaleDateString();
    
    if (!processedDates.has(dateStr) && dailyForecasts.length < 5) {
      processedDates.add(dateStr);
      dailyForecasts.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        temp: Math.round(item.main.temp),
        tempMin: Math.round(item.main.temp_min),
        tempMax: Math.round(item.main.temp_max),
        condition: item.weather[0].main,
        icon: item.weather[0].icon,
        description: item.weather[0].description,
      });
    }
  }

  return dailyForecasts;
  } catch (error) {
    console.error("Forecast fetch error:", error);
    return [];
  }
}
