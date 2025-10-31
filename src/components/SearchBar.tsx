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
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
          <Input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder={placeholder}
            className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-2xl backdrop-blur-xl focus:bg-white/20 transition-all"
          />
        </div>
        <Button
          type="button"
          onClick={onLocationRequest}
          className="h-14 w-14 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-xl transition-all"
          size="icon"
        >
          <MapPin className="w-5 h-5 text-white" />
        </Button>
      </form>
    </div>
  );
}
