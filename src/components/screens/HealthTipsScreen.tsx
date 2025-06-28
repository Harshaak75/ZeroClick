
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Volume2, ChevronRight } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';

interface HealthTip {
  id: string;
  title: string;
  icon: string;
  tip: string;
  details: string;
  category: 'hydration' | 'exercise' | 'diet' | 'mental' | 'sleep';
}

const HealthTipsScreen = () => {
  const navigate = useNavigate();
  const [expandedTip, setExpandedTip] = useState<string | null>(null);
  
  const healthTips: HealthTip[] = [
    {
      id: '1',
      title: 'Stay Hydrated',
      icon: '💧',
      tip: 'Drink 8-10 glasses of water daily to keep your body healthy and energetic.',
      details: 'Water helps maintain body temperature, lubricates joints, and helps transport nutrients. Start your day with a glass of warm water.',
      category: 'hydration'
    },
    {
      id: '2',
      title: 'Morning Walk',
      icon: '🚶‍♂️',
      tip: 'Take a 30-minute walk every morning for better heart health and mood.',
      details: 'Walking improves cardiovascular health, strengthens bones, and boosts mental well-being. Best time is early morning when air is fresh.',
      category: 'exercise'
    },
    {
      id: '3',
      title: 'Eat Colorful Foods',
      icon: '🍎',
      tip: 'Include fruits and vegetables of different colors in your daily diet.',
      details: 'Different colored fruits and vegetables provide various vitamins and antioxidants. Aim for at least 5 servings per day.',
      category: 'diet'
    },
    {
      id: '4',
      title: 'Practice Deep Breathing',
      icon: '🧘‍♀️',
      tip: 'Spend 10 minutes daily practicing deep breathing to reduce stress.',
      details: 'Deep breathing activates the relaxation response, lowers blood pressure, and reduces anxiety. Practice in a quiet space.',
      category: 'mental'
    },
    {
      id: '5',
      title: 'Quality Sleep',
      icon: '😴',
      tip: 'Maintain a regular sleep schedule and aim for 7-8 hours of sleep.',
      details: 'Good sleep helps repair your body, consolidates memories, and boosts immune function. Avoid screens 1 hour before bed.',
      category: 'sleep'
    }
  ];

  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const currentTip = healthTips[currentTipIndex];

  const handleReadAloud = () => {
    console.log('Reading health tip aloud...');
  };

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % healthTips.length);
    setExpandedTip(null);
  };

  const prevTip = () => {
    setCurrentTipIndex((prev) => (prev - 1 + healthTips.length) % healthTips.length);
    setExpandedTip(null);
  };

  const toggleExpand = (tipId: string) => {
    setExpandedTip(expandedTip === tipId ? null : tipId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-12 pb-6">
        <button 
          onClick={() => navigate('/')}
          className="bg-white rounded-full p-3 shadow-md"
        >
          <ArrowLeft size={24} className="text-zeroclick-blue" />
        </button>
        <h1 className="text-2xl font-bold text-green-700">❤️ Health Tips</h1>
        <button 
          onClick={handleReadAloud}
          className="bg-green-500 rounded-full p-3 shadow-md"
        >
          <Volume2 size={24} className="text-white" />
        </button>
      </div>

      {/* Today's Featured Tip */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <div className="text-center mb-4">
            <div className="text-6xl mb-4">{currentTip.icon}</div>
            <h2 className="text-2xl font-bold text-green-700 mb-2">
              💡 Today's Health Tip
            </h2>
            <h3 className="text-xl font-bold text-zeroclick-blue mb-4">
              {currentTip.title}
            </h3>
          </div>

          <div className="bg-green-50 rounded-2xl p-6 mb-6">
            <p className="text-lg text-zeroclick-blue leading-relaxed mb-4">
              {currentTip.tip}
            </p>
            
            <button
              onClick={() => toggleExpand(currentTip.id)}
              className="flex items-center space-x-2 text-green-600 font-semibold"
            >
              <span>Tell me more</span>
              <ChevronRight 
                size={20} 
                className={`transition-transform ${
                  expandedTip === currentTip.id ? 'rotate-90' : ''
                }`} 
              />
            </button>

            {expandedTip === currentTip.id && (
              <div className="mt-4 p-4 bg-white rounded-xl">
                <p className="text-zeroclick-blue leading-relaxed">
                  {currentTip.details}
                </p>
              </div>
            )}
          </div>

          {/* Navigation and Audio */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={prevTip}
              className="bg-green-500 text-white px-6 py-3 rounded-full font-bold"
            >
              ← Previous
            </button>

            <span className="text-sm text-gray-500">
              {currentTipIndex + 1} of {healthTips.length}
            </span>

            <button
              onClick={nextTip}
              className="bg-green-500 text-white px-6 py-3 rounded-full font-bold"
            >
              Next →
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={handleReadAloud}
              className="bg-green-600 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center space-x-3 mx-auto shadow-lg"
            >
              <Volume2 size={24} />
              <span>🔈 Read Tip Aloud</span>
            </button>
          </div>
        </div>
      </div>

      {/* All Health Tips */}
      <div className="px-6 mb-20">
        <h3 className="text-xl font-bold text-zeroclick-blue mb-4">🌟 All Health Tips</h3>
        <div className="space-y-3">
          {healthTips.map((tip, index) => (
            <button
              key={tip.id}
              onClick={() => setCurrentTipIndex(index)}
              className={`w-full text-left bg-white rounded-2xl p-4 shadow-md transition-all ${
                index === currentTipIndex 
                  ? 'border-2 border-green-500 scale-105' 
                  : 'border border-gray-200'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{tip.icon}</div>
                <div>
                  <h4 className="font-bold text-zeroclick-blue text-lg">{tip.title}</h4>
                  <p className="text-sm text-zeroclick-blue/70 mt-1">
                    {tip.tip.substring(0, 60)}...
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <BottomNavigation currentScreen="health" />
    </div>
  );
};

export default HealthTipsScreen;
