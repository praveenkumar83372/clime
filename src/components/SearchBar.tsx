import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationRequest: () => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, onLocationRequest, placeholder = "Search city..." }: SearchBarProps) {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity("");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mb-8 animate-slide-up">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="relative flex-1 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-white group-hover:scale-110 transition-all duration-300 drop-shadow-lg text-shadow-soft animate-pulse-slow" />
          <Input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder={placeholder}
            /* * UPDATED THIS LINE:
             * Changed "placeholder:text-white/90" to "placeholder:text-white"
             */
            className="pl-14 h-16 glass-card text-white text-lg placeholder:text-white rounded-3xl focus:shadow-elevated transition-all font-medium text-shadow-soft border-2"
          />
        </div>
        <Button
          type="button"
          onClick={onLocationRequest}
          className="h-16 w-16 rounded-3xl glass-card interactive-glow hover:shadow-elevated hover:animate-wiggle border-2"
          size="icon"
        >
          <MapPin className="w-6 h-6 text-white drop-shadow-lg" />
        </Button>
      </form>
    </div>
  );
}
