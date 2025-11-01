import { useState, useEffect } from "react";
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface VoiceConversationProps {
  onClose: () => void;
  weatherCondition: string;
  mood: string;
}

export function VoiceConversation({ onClose, weatherCondition, mood }: VoiceConversationProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error("Speech recognition not supported in your browser");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setTranscript(transcript);
      handleUserInput(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      toast.error("Could not understand. Please try again.");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleUserInput = (input: string) => {
    const lowerInput = input.toLowerCase();
    let reply = "";

    if (lowerInput.includes("mood") || lowerInput.includes("feeling")) {
      reply = `Right now, the weather feels ${mood}. ${weatherCondition} skies today!`;
    } else if (lowerInput.includes("weather")) {
      reply = `It's ${weatherCondition} outside. ${mood === "cozy" ? "Perfect weather to stay in!" : "Beautiful day ahead!"}`;
    } else if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
      reply = "Hey there! I'm Clime, your sky companion. How can I help you today?";
    } else {
      reply = `The weather is ${weatherCondition} and feeling ${mood} today. Want to know more?`;
    }

    setResponse(reply);
    speak(reply);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-md w-full shadow-2xl animate-scale-in">
        <h3 className="text-2xl font-bold text-white mb-4">Talk to Clime</h3>
        
        <div className="mb-6">
          <div className="text-white/70 text-sm mb-2">Try saying:</div>
          <div className="text-white/90 italic">"What's my mood today?"</div>
        </div>

        {transcript && (
          <div className="mb-4 p-4 bg-white/5 rounded-2xl">
            <div className="text-white/50 text-xs mb-1">You said:</div>
            <div className="text-white">{transcript}</div>
          </div>
        )}

        {response && (
          <div className="mb-6 p-4 bg-white/5 rounded-2xl">
            <div className="text-white/50 text-xs mb-1">Clime says:</div>
            <div className="text-white">{response}</div>
          </div>
        )}

        <div className="flex gap-3">
          <Button
            onClick={startListening}
            disabled={isListening}
            className="flex-1 h-14 rounded-2xl bg-white/20 hover:bg-white/30 border border-white/20 text-white font-medium transition-all"
          >
            {isListening ? (
              <>
                <MicOff className="w-5 h-5 mr-2 animate-pulse" />
                Listening...
              </>
            ) : (
              <>
                <Mic className="w-5 h-5 mr-2" />
                Start Speaking
              </>
            )}
          </Button>

          <Button
            onClick={onClose}
            className="h-14 px-6 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
