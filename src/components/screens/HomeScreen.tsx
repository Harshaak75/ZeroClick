
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Info } from 'lucide-react';
import FeatureGrid from '@/components/FeatureGrid';
import BottomNavigation from '@/components/BottomNavigation';
import UpcomingTasks from '@/components/UpcomingTasks';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime.getHours();
    if (hour < 12) {
      setGreeting('🌅 Good Morning');
    } else if (hour < 17) {
      setGreeting('☀️ Good Afternoon');
    } else {
      setGreeting('🌙 Good Evening');
    }
  }, [currentTime]);

  const handleVoiceCommand = () => {
    // Voice command functionality would be implemented here
    console.log('Voice command activated');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zeroclick-peach to-white">
      {/* Header with Greeting */}
      <div className="px-6 pt-12 pb-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-zeroclick-blue mb-2">
            {greeting}, Harsha! 
          </h1>
          <p className="text-lg text-zeroclick-blue/70 font-medium">
            {currentTime.toLocaleDateString('en-IN', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long' 
            })}
          </p>
        </div>
      </div>

      {/* Central Microphone Button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={handleVoiceCommand}
          className="mic-button w-24 h-24 flex items-center justify-center"
          aria-label="Voice Command Button"
        >
          <Mic size={40} className="text-white" />
        </button>
      </div>

      {/* Upcoming Tasks */}
      <UpcomingTasks />

      {/* Feature Grid */}
      <FeatureGrid />

      {/* Gesture Help Button */}
      <div className="fixed top-4 right-4">
        <button 
          className="bg-zeroclick-light-blue rounded-full p-3 shadow-lg"
          aria-label="Help and Gestures"
        >
          <Info size={24} className="text-zeroclick-blue" />
        </button>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation currentScreen="home" />
    </div>
  );
};

export default HomeScreen;
