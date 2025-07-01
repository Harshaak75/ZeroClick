
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Volume2, Share } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';

const DailySummaryScreen = () => {
  const navigate = useNavigate();
  
  const summaryData = {
    date: new Date().toLocaleDateString('en-IN', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long',
      year: 'numeric' 
    }),
    tasksCompleted: 3,
    totalTasks: 5,
    alertsTriggered: 0,
    newsRead: 4,
    healthTipsViewed: 2,
    timeSpent: '45 minutes'
  };

  const completedTasks = [
    { icon: '💊', task: 'Took morning medicine', time: '8:00 AM' },
    { icon: '🚶‍♂️', task: 'Completed morning walk', time: '7:30 AM' },
    { icon: '📰', task: 'Read daily news', time: '9:15 AM' }
  ];

  const pendingTasks = [
    { icon: '📞', task: 'Call Dr. Sharma', time: '3:30 PM' },
    { icon: '🧘', task: 'Evening yoga session', time: '6:00 PM' }
  ];

  const handleReadAloud = () => {
    console.log('Reading daily summary aloud...');
  };

  const handleShareWithCaregiver = () => {
    console.log('Sharing summary with caregiver via WhatsApp...');
    // In real app, this would open WhatsApp with pre-filled message
  };

  return (
    <div className="min-h-screen pb-[2.5rem] bg-gradient-to-br from-zeroclick-peach to-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-12 pb-6">
        <button 
          onClick={() => navigate('/')}
          className="bg-white rounded-full p-3 shadow-md"
        >
          <ArrowLeft size={24} className="text-zeroclick-blue" />
        </button>
        <h1 className="text-[1.4rem] font-bold text-zeroclick-blue">📊 Daily Summary</h1>
        <button 
          onClick={handleReadAloud}
          className="bg-zeroclick-orange rounded-full p-3 shadow-md"
        >
          <Volume2 size={24} className="text-white" />
        </button>
      </div>

      {/* Date and Overview */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-zeroclick-blue mb-2">
              📅 {summaryData.date}
            </h2>
            <p className="text-lg text-zeroclick-blue/70">
              🕐 Total app usage: {summaryData.timeSpent}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 rounded-2xl p-4 text-center">
              <div className="text-3xl mb-2">✅</div>
              <div className="font-bold text-green-700 text-xl">
                {summaryData.tasksCompleted}/{summaryData.totalTasks}
              </div>
              <div className="text-sm text-green-600">Tasks Done</div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-4 text-center">
              <div className="text-3xl mb-2">📰</div>
              <div className="font-bold text-blue-700 text-xl">
                {summaryData.newsRead}
              </div>
              <div className="text-sm text-blue-600">News Read</div>
            </div>

            <div className="bg-red-50 rounded-2xl p-4 text-center">
              <div className="text-3xl mb-2">🆘</div>
              <div className="font-bold text-red-700 text-xl">
                {summaryData.alertsTriggered}
              </div>
              <div className="text-sm text-red-600">SOS Alerts</div>
            </div>

            <div className="bg-purple-50 rounded-2xl p-4 text-center">
              <div className="text-3xl mb-2">❤️</div>
              <div className="font-bold text-purple-700 text-xl">
                {summaryData.healthTipsViewed}
              </div>
              <div className="text-sm text-purple-600">Health Tips</div>
            </div>
          </div>
        </div>
      </div>

      {/* Completed Tasks */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center">
            <span className="text-2xl mr-2">✅</span>
            Completed Today
          </h3>
          <div className="space-y-3">
            {completedTasks.map((task, index) => (
              <div key={index} className="bg-green-50 rounded-2xl p-4 flex items-center space-x-4">
                <span className="text-2xl">{task.icon}</span>
                <div>
                  <p className="font-semibold text-zeroclick-blue">{task.task}</p>
                  <p className="text-sm text-green-600">{task.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Tasks */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-orange-700 mb-4 flex items-center">
            <span className="text-2xl mr-2">⏰</span>
            Still Pending
          </h3>
          <div className="space-y-3">
            {pendingTasks.map((task, index) => (
              <div key={index} className="bg-orange-50 rounded-2xl p-4 flex items-center space-x-4">
                <span className="text-2xl">{task.icon}</span>
                <div>
                  <p className="font-semibold text-zeroclick-blue">{task.task}</p>
                  <p className="text-sm text-orange-600">{task.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 mb-20">
        <div className="space-y-4">
          <button
            onClick={handleReadAloud}
            className="w-full bg-zeroclick-orange text-white rounded-2xl py-4 font-bold text-lg flex items-center justify-center space-x-3 shadow-lg"
          >
            <Volume2 size={24} />
            <span>🔈 Read Summary Aloud</span>
          </button>

          <button
            onClick={handleShareWithCaregiver}
            className="w-full bg-green-600 text-white rounded-2xl py-4 font-bold text-lg flex items-center justify-center space-x-3 shadow-lg"
          >
            <Share size={24} />
            <span>📤 Share with Caregiver</span>
          </button>
        </div>
      </div>

      <BottomNavigation currentScreen="summary" />
    </div>
  );
};

export default DailySummaryScreen;
