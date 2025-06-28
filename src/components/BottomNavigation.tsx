
import { useNavigate } from 'react-router-dom';
import { Home, Calendar, Settings } from 'lucide-react';

interface BottomNavigationProps {
  currentScreen: string;
}

const BottomNavigation = ({ currentScreen }: BottomNavigationProps) => {
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', icon: Home, label: '🏠 Home', route: '/' },
    { id: 'reminders', icon: Calendar, label: '📅 Tasks', route: '/reminders' },
    { id: 'settings', icon: Settings, label: '⚙️ Settings', route: '/settings' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-zeroclick-orange/20 px-4 py-3">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.route)}
              className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-2xl transition-all ${
                isActive 
                  ? 'bg-zeroclick-orange text-white' 
                  : 'text-zeroclick-blue hover:bg-zeroclick-orange/10'
              }`}
              aria-label={item.label}
            >
              <IconComponent size={24} />
              <span className="text-xs font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
