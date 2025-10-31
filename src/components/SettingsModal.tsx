import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Language, translations } from "@/lib/translations";

interface SettingsModalProps {
  onClose: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  savedCities: string[];
  onCityAdd: (city: string) => void;
  onCityRemove: (city: string) => void;
}

export function SettingsModal({
  onClose,
  language,
  onLanguageChange,
  savedCities,
  onCityAdd,
  onCityRemove,
}: SettingsModalProps) {
  const languages: { code: Language; name: string }[] = [
    { code: "en", name: "English" },
    { code: "ta", name: "தமிழ்" },
    { code: "hi", name: "हिंदी" },
    { code: "te", name: "తెలుగు" },
    { code: "ml", name: "മലയാളം" },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-md w-full shadow-2xl animate-scale-in max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Settings</h3>
          <Button
            onClick={onClose}
            size="icon"
            className="rounded-full bg-white/5 hover:bg-white/20 border-0 w-10 h-10"
          >
            <X className="w-5 h-5 text-white" />
          </Button>
        </div>

        {/* Language Selection */}
        <div className="mb-6">
          <h4 className="text-white/90 font-medium mb-3">Language</h4>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                onClick={() => onLanguageChange(lang.code)}
                className={`h-12 rounded-xl transition-all ${
                  language === lang.code
                    ? "bg-white/30 border-white/40"
                    : "bg-white/5 border-white/10 hover:bg-white/20"
                } border text-white`}
              >
                {lang.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Saved Cities */}
        <div>
          <h4 className="text-white/90 font-medium mb-3">Saved Cities</h4>
          {savedCities.length === 0 ? (
            <p className="text-white/60 text-sm">No saved cities yet</p>
          ) : (
            <div className="space-y-2">
              {savedCities.map((city) => (
                <div
                  key={city}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10"
                >
                  <span className="text-white">{city}</span>
                  <Button
                    onClick={() => onCityRemove(city)}
                    size="icon"
                    className="rounded-full bg-white/5 hover:bg-white/20 border-0 w-8 h-8"
                  >
                    <X className="w-4 h-4 text-white" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
