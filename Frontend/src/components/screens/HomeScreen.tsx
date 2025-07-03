import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff } from 'lucide-react';
import FeatureGrid from '@/components/FeatureGrid';
import BottomNavigation from '@/components/BottomNavigation';
import UpcomingTasks from '@/components/UpcomingTasks';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useVoiceRecording } from '@/hooks/useVoiceRecording';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');
  const { speak, stop, isSpeaking } = useTextToSpeech();
  const { isListening, transcript, startListening, stopListening } = useVoiceRecording();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime.getHours();
    if (hour < 12) setGreeting('🌅 Good Morning');
    else if (hour < 17) setGreeting('☀️ Good Afternoon');
    else setGreeting('🌙 Good Evening');
  }, [currentTime]);

  const handleVoiceCommand = () => {
    // Toggle mic behavior
    if (isListening) {
      stopListening();
      return;
    }
    if (isSpeaking) {
      stop();
      return;
    }

    const welcomeMessage = `${greeting}, Harsha! How can I help you today?`;
    speak(welcomeMessage);

    setTimeout(() => {
      startListening();
    }, 3000);
  };

  useEffect(() => {
    const lower = transcript.toLowerCase();
    if (lower.includes('reminder') || lower.includes('ನೆನಪಿಸು')) navigate('/reminders');
    if (lower.includes('news') || lower.includes('ಸುದ್ದಿ')) navigate('/news');
    if (lower.includes('horoscope') || lower.includes('ಜಾತಕ')) navigate('/horoscope');
  }, [transcript, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zeroclick-peach to-white pb-[2.5rem]">
      {/* Greeting Header */}
      <div className="px-6 pt-12 pb-6 text-center">
        <h1 className="text-3xl font-bold text-zeroclick-blue mb-2">
          {greeting}, Harsha!
        </h1>
        <p className="text-lg text-zeroclick-blue/70">
          {currentTime.toLocaleDateString('en-IN', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
        </p>
      </div>

      {/* Mic Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={handleVoiceCommand}
          className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg transition-all ${
            isListening ? 'bg-red-500 animate-pulse' : 'bg-zeroclick-blue'
          } ${isSpeaking ? 'animate-bounce' : ''}`}
        >
          {isListening ? (
            <MicOff size={40} className="text-white" />
          ) : (
            <Mic size={40} className="text-white" />
          )}
        </button>
      </div>

      {/* Voice Status Display */}
      {(isSpeaking || isListening) && (
        <p className="text-center text-lg font-bold text-zeroclick-blue mb-2">
          {isSpeaking ? '🔊 Speaking…' : '🎤 Listening…'}
        </p>
      )}
      {transcript && (
        <p className="text-center text-base text-zeroclick-blue/80 mb-4 italic">
          🗣️ "{transcript}"
        </p>
      )}

      {/* Optional Test Voice Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() =>
            speak('Hello! I am your assistant. How can I help you today?')
          }
          className="bg-zeroclick-mint text-white px-5 py-3 rounded-2xl font-semibold shadow-md"
        >
          🔈 Test Voice
        </button>
      </div>

      {/* Sections */}
      <UpcomingTasks />
      <FeatureGrid />
      <BottomNavigation currentScreen="home" />
    </div>
  );
};

export default HomeScreen;
