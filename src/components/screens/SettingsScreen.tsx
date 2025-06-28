
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Volume2, QrCode, Clock } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';

const SettingsScreen = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [voiceSpeed, setVoiceSpeed] = useState(50);
  const [volume, setVolume] = useState(80);
  const [dailyBriefing, setDailyBriefing] = useState(true);

  const languages = [
    { id: 'english', name: 'English', flag: '🇬🇧', nativeName: 'English' },
    { id: 'hindi', name: 'Hindi', flag: '🇮🇳', nativeName: 'हिंदी' },
    { id: 'kannada', name: 'Kannada', flag: '🇮🇳', nativeName: 'ಕನ್ನಡ' }
  ];

  const handleTestVoice = () => {
    console.log('Testing voice settings...');
  };

  const handleQRScan = () => {
    console.log('Opening QR scanner for caregiver linking...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zeroclick-peach to-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-12 pb-6">
        <button 
          onClick={() => navigate('/')}
          className="bg-white rounded-full p-3 shadow-md"
        >
          <ArrowLeft size={24} className="text-zeroclick-blue" />
        </button>
        <h1 className="text-2xl font-bold text-zeroclick-blue">⚙️ Settings</h1>
        <div className="w-12"></div>
      </div>

      {/* Caregiver Section */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-zeroclick-blue mb-4 flex items-center">
            <span className="text-2xl mr-3">👨‍⚕️</span>
            Caregiver Connection
          </h2>
          
          <div className="bg-blue-50 rounded-2xl p-4 mb-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">👨‍⚕️</span>
              </div>
              <div>
                <p className="font-bold text-zeroclick-blue">Dr. Rajesh Kumar</p>
                <p className="text-sm text-blue-600">Connected Caregiver</p>
              </div>
            </div>
            <p className="text-sm text-zeroclick-blue/70">📞 +91 98765 43210</p>
          </div>

          <button
            onClick={handleQRScan}
            className="w-full bg-zeroclick-orange text-white rounded-2xl py-3 font-bold flex items-center justify-center space-x-3"
          >
            <QrCode size={24} />
            <span>📱 Link New Caregiver</span>
          </button>
        </div>
      </div>

      {/* Language Settings */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-zeroclick-blue mb-4 flex items-center">
            <span className="text-2xl mr-3">🌍</span>
            Language / भाषा
          </h2>
          
          <div className="space-y-3">
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setSelectedLanguage(lang.id)}
                className={`w-full p-4 rounded-2xl border-2 transition-all ${
                  selectedLanguage === lang.id
                    ? 'border-zeroclick-orange bg-orange-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">{lang.flag}</span>
                  <div className="text-left">
                    <p className="font-bold text-zeroclick-blue">{lang.name}</p>
                    <p className="text-sm text-zeroclick-blue/70">{lang.nativeName}</p>
                  </div>
                  {selectedLanguage === lang.id && (
                    <div className="ml-auto text-2xl">✅</div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Voice Settings */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-zeroclick-blue mb-4 flex items-center">
            <span className="text-2xl mr-3">🔊</span>
            Voice Settings
          </h2>
          
          {/* Voice Speed */}
          <div className="mb-6">
            <label className="block text-lg font-semibold text-zeroclick-blue mb-3">
              🐌 Speech Speed 🐰
            </label>
            <div className="bg-gray-100 rounded-2xl p-4">
              <input
                type="range"
                min="0"
                max="100"
                value={voiceSpeed}
                onChange={(e) => setVoiceSpeed(Number(e.target.value))}
                className="w-full h-3 bg-zeroclick-orange rounded-full appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-zeroclick-blue/70 mt-2">
                <span>Slow</span>
                <span>{voiceSpeed}%</span>
                <span>Fast</span>
              </div>
            </div>
          </div>

          {/* Volume */}
          <div className="mb-6">
            <label className="block text-lg font-semibold text-zeroclick-blue mb-3">
              🔇 Volume 🔊
            </label>
            <div className="bg-gray-100 rounded-2xl p-4">
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-3 bg-zeroclick-orange rounded-full appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-zeroclick-blue/70 mt-2">
                <span>Quiet</span>
                <span>{volume}%</span>
                <span>Loud</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleTestVoice}
            className="w-full bg-zeroclick-mint text-white rounded-2xl py-3 font-bold flex items-center justify-center space-x-3"
          >
            <Volume2 size={24} />
            <span>🎵 Test Voice</span>
          </button>
        </div>
      </div>

      {/* Daily Briefing */}
      <div className="px-6 mb-20">
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-zeroclick-blue mb-4 flex items-center">
            <span className="text-2xl mr-3">📢</span>
            Daily Briefing
          </h2>
          
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-2xl">
            <div className="flex items-center space-x-3">
              <Clock size={28} className="text-zeroclick-orange" />
              <div>
                <p className="font-bold text-zeroclick-blue">Morning Briefing</p>
                <p className="text-sm text-zeroclick-blue/70">Auto-play at 8:00 AM</p>
              </div>
            </div>
            
            <button
              onClick={() => setDailyBriefing(!dailyBriefing)}
              className={`w-16 h-8 rounded-full transition-all ${
                dailyBriefing ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div className={`w-6 h-6 bg-white rounded-full transition-all ${
                dailyBriefing ? 'translate-x-9' : 'translate-x-1'
              }`}></div>
            </button>
          </div>
        </div>
      </div>

      <BottomNavigation currentScreen="settings" />
    </div>
  );
};

export default SettingsScreen;
