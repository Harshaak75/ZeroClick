
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Volume2 } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';

const HoroscopeScreen = () => {
  const navigate = useNavigate();
  const [selectedSign, setSelectedSign] = useState('aries');
  const { speak, isSpeaking } = useTextToSpeech();
  
  const zodiacSigns = {
    aries: { emoji: '♈', name: 'Aries', dates: 'Mar 21 - Apr 19' },
    taurus: { emoji: '♉', name: 'Taurus', dates: 'Apr 20 - May 20' },
    gemini: { emoji: '♊', name: 'Gemini', dates: 'May 21 - Jun 20' },
    cancer: { emoji: '♋', name: 'Cancer', dates: 'Jun 21 - Jul 22' },
    leo: { emoji: '♌', name: 'Leo', dates: 'Jul 23 - Aug 22' },
    virgo: { emoji: '♍', name: 'Virgo', dates: 'Aug 23 - Sep 22' },
    libra: { emoji: '♎', name: 'Libra', dates: 'Sep 23 - Oct 22' },
    scorpio: { emoji: '♏', name: 'Scorpio', dates: 'Oct 23 - Nov 21' },
    sagittarius: { emoji: '♐', name: 'Sagittarius', dates: 'Nov 22 - Dec 21' },
    capricorn: { emoji: '♑', name: 'Capricorn', dates: 'Dec 22 - Jan 19' },
    aquarius: { emoji: '♒', name: 'Aquarius', dates: 'Jan 20 - Feb 18' },
    pisces: { emoji: '♓', name: 'Pisces', dates: 'Feb 19 - Mar 20' }
  };

const horoscopes = {
  aries: "Today brings positive energy and new opportunities. Your confidence will help you overcome any challenges. Lucky color: Red",
  taurus: "A peaceful day ahead with focus on family and home. Financial matters look promising. Lucky color: Green",
  gemini: "Communication is key today. Reach out to old friends and strengthen relationships. Lucky color: Yellow",
  cancer: "Your intuition is especially strong today. Trust your instincts in important decisions. Lucky color: Blue",
  leo: "Leadership opportunities may arise. Your creative energy is at its peak today. Lucky color: Orange",
  virgo: "Attention to detail will pay off. Focus on health and wellness activities. Lucky color: Brown",
  libra: "Balance is crucial today. You may find yourself resolving conflicts and bringing harmony. Lucky color: Pink",
  scorpio: "Emotional depth and passion define your day. A good time to focus on long-term goals. Lucky color: Maroon",
  sagittarius: "Adventure calls! Take a chance on something new and exciting. Lucky color: Purple",
  capricorn: "Hard work pays off. Stay focused and you'll see results in career or finances. Lucky color: Grey",
  aquarius: "Think outside the box. Innovation and creativity will lead to success. Lucky color: Turquoise",
  pisces: "Compassion and empathy guide your actions today. A great time for artistic or spiritual pursuits. Lucky color: Sea green"
};


  const handleReadAloud = () => {
    const signData = zodiacSigns[selectedSign as keyof typeof zodiacSigns];
    const horoscope = horoscopes[selectedSign as keyof typeof horoscopes] || 
      "The stars align favorably for you today. Stay positive and embrace new opportunities that come your way.";
    
    const textToRead = `Here is your horoscope for ${signData.name}. ${horoscope}`;
    speak(textToRead);
  };

  return (
    <div className="min-h-screen pb-[1.5rem] bg-gradient-to-br from-purple-50 to-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-12 pb-6">
        <button 
          onClick={() => navigate('/')}
          className="bg-white rounded-full p-3 shadow-md"
        >
          <ArrowLeft size={24} className="text-zeroclick-blue" />
        </button>
        <h1 className="text-2xl font-bold text-purple-700">🔮 Horoscope</h1>
        <button 
          onClick={handleReadAloud}
          className={`bg-purple-500 rounded-full p-3 shadow-md ${isSpeaking ? 'animate-pulse' : ''}`}
        >
          <Volume2 size={24} className="text-white" />
        </button>
      </div>

      {/* Current Date */}
      <div className="text-center mb-6">
        <p className="text-lg text-zeroclick-blue font-medium">
          ✨ {new Date().toLocaleDateString('en-IN', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long',
            year: 'numeric'
          })} ✨
        </p>
      </div>

      {/* Zodiac Sign Selector */}
      <div className="px-6 mb-6">
        <h2 className="text-xl font-bold text-zeroclick-blue mb-4 text-center">
          🌟 Select Your Sign
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(zodiacSigns).slice(0, 12  ).map(([key, sign]) => (
            <button
              key={key}
              onClick={() => setSelectedSign(key)}
              className={`bg-white rounded-2xl p-4 shadow-md text-center transition-all ${
                selectedSign === key 
                  ? 'border-2 border-purple-500 scale-105' 
                  : 'border border-gray-200'
              }`}
            >
              <div className="text-3xl mb-2">{sign.emoji}</div>
              <div className="text-sm font-bold text-zeroclick-blue">{sign.name}</div>
              <div className="text-xs text-gray-500">{sign.dates}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Today's Horoscope */}
      <div className="px-6 mb-20">
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">
              {zodiacSigns[selectedSign as keyof typeof zodiacSigns].emoji}
            </div>
            <h3 className="text-2xl font-bold text-purple-700 mb-2">
              {zodiacSigns[selectedSign as keyof typeof zodiacSigns].name}
            </h3>
            <p className="text-gray-600">
              {zodiacSigns[selectedSign as keyof typeof zodiacSigns].dates}
            </p>
          </div>

          <div className="bg-purple-50 rounded-2xl p-6">
            <h4 className="text-xl font-bold text-purple-700 mb-4 text-center">
              🌙 Today's Prediction
            </h4>
            <p className="text-lg text-zeroclick-blue leading-relaxed text-center">
              {horoscopes[selectedSign as keyof typeof horoscopes] || 
               "The stars align favorably for you today. Stay positive and embrace new opportunities that come your way."}
            </p>
          </div>

          {/* Read Aloud Button */}
          <div className="text-center mt-6">
            <button
              onClick={handleReadAloud}
              className={`bg-purple-500 text-white px-8 py-4 rounded-2xl font-bold text-[1rem] flex items-center space-x-3 mx-auto shadow-lg ${
                isSpeaking ? 'animate-pulse' : ''
              }`}
            >
              <Volume2 size={24} />
              <span>Read My Horoscope</span>
            </button>
          </div>
        </div>
      </div>

      <BottomNavigation currentScreen="horoscope" />
    </div>
  );
};

export default HoroscopeScreen;
