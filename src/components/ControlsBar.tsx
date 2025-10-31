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
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 animate-slide-up">
      <div className="flex gap-3 p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl">
        <Button
          onClick={onVoiceClick}
          size="icon"
          className="rounded-full bg-white/5 hover:bg-white/20 border-0 w-12 h-12 transition-all hover:scale-110"
        >
          <Mic className="w-5 h-5 text-white" />
        </Button>

        <Button
          onClick={onThemeToggle}
          size="icon"
          className="rounded-full bg-white/5 hover:bg-white/20 border-0 w-12 h-12 transition-all hover:scale-110"
        >
          {isDark ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5 text-white" />}
        </Button>

        <Button
          onClick={onSoundToggle}
          size="icon"
          className="rounded-full bg-white/5 hover:bg-white/20 border-0 w-12 h-12 transition-all hover:scale-110"
        >
          {isSoundOn ? <Volume2 className="w-5 h-5 text-white" /> : <VolumeX className="w-5 h-5 text-white" />}
        </Button>

        <Button
          onClick={onShareClick}
          size="icon"
          className="rounded-full bg-white/5 hover:bg-white/20 border-0 w-12 h-12 transition-all hover:scale-110"
        >
          <Share2 className="w-5 h-5 text-white" />
        </Button>

        <Button
          onClick={onSettingsClick}
          size="icon"
          className="rounded-full bg-white/5 hover:bg-white/20 border-0 w-12 h-12 transition-all hover:scale-110"
        >
          <Settings className="w-5 h-5 text-white" />
        </Button>
      </div>
    </div>
  );
}
