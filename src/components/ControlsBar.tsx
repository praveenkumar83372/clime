import { Mic, Moon, Sun, Volume2, VolumeX, Share2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ControlsBarProps {
  isDark: boolean;
  onThemeToggle: () => void;
  isSoundOn: boolean;
  onSoundToggle: () => void;
  onVoiceClick: () => void;
  onShareClick: () => void;
  onSettingsClick: () => void;
}

export function ControlsBar({
  isDark,
  onThemeToggle,
  isSoundOn,
  onSoundToggle,
  onVoiceClick,
  onShareClick,
  onSettingsClick,
}: ControlsBarProps) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 animate-slide-up z-50">
      <div className="flex gap-4 p-5 glass-card rounded-full shadow-elevated border-2">
        <Button
          onClick={onVoiceClick}
          size="icon"
          className="rounded-full bg-white/10 hover:bg-white/25 border-0 w-14 h-14 interactive-glow group hover:animate-pulse"
        >
          <Mic className="w-6 h-6 text-white group-hover:text-pink-300 transition-colors duration-300 drop-shadow-lg" />
        </Button>

        <Button
          onClick={onThemeToggle}
          size="icon"
          className="rounded-full bg-white/10 hover:bg-white/25 border-0 w-14 h-14 interactive-glow group hover:animate-wiggle"
        >
          {isDark ? <Sun className="w-6 h-6 text-white group-hover:text-yellow-300 transition-colors duration-300 drop-shadow-lg" /> : <Moon className="w-6 h-6 text-white group-hover:text-indigo-300 transition-colors duration-300 drop-shadow-lg" />}
        </Button>

        <Button
          onClick={onSoundToggle}
          size="icon"
          className="rounded-full bg-white/10 hover:bg-white/25 border-0 w-14 h-14 interactive-glow group hover:animate-pop"
        >
          {isSoundOn ? <Volume2 className="w-6 h-6 text-white group-hover:text-green-300 transition-colors duration-300 drop-shadow-lg" /> : <VolumeX className="w-6 h-6 text-white group-hover:text-red-300 transition-colors duration-300 drop-shadow-lg" />}
        </Button>

        <Button
          onClick={onShareClick}
          size="icon"
          className="rounded-full bg-white/10 hover:bg-white/25 border-0 w-14 h-14 interactive-glow group hover:animate-pop"
        >
          <Share2 className="w-6 h-6 text-white group-hover:text-blue-300 transition-colors duration-300 drop-shadow-lg" />
        </Button>

        <Button
          onClick={onSettingsClick}
          size="icon"
          className="rounded-full bg-white/10 hover:bg-white/25 border-0 w-14 h-14 interactive-glow group hover:rotate-90"
        >
          <Settings className="w-6 h-6 text-white group-hover:text-purple-300 transition-all duration-300 drop-shadow-lg" />
        </Button>
      </div>
    </div>
  );
}
