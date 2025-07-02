import { useNavigate } from 'react-router-dom';
import { Home, Calendar, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';

interface BottomNavigationProps {
  currentScreen: string;
}

const BottomNavigation = ({ currentScreen }: BottomNavigationProps) => {
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', icon: Home, label: 'Home', route: '/' },
    { id: 'reminders', icon: Calendar, label: 'Tasks', route: '/reminders' },
    { id: 'settings', icon: Settings, label: 'Settings', route: '/settings' },
  ];

  const [isButtonNavigation, setIsButtonNavigation] = useState(false); // Detect if system navigation buttons are used
  const [isVisible, setIsVisible] = useState(true); // Control visibility of the bottom navigation bar

  useEffect(() => {
    // Function to detect if system navigation buttons (Home, Back, Recent) are visible
    const checkNavigationType = () => {
      const isButton =
        window.visualViewport &&
        Math.abs(window.innerHeight - window.visualViewport.height) > 50; // Significant difference means system navigation is visible

      setIsButtonNavigation(isButton); // Set the state based on whether button navigation is active
    };

    // Listen for viewport resize (changes when navigation type changes)
    window.visualViewport?.addEventListener('resize', checkNavigationType);
    checkNavigationType(); // Initial check when the component is mounted

    return () => {
      window.visualViewport?.removeEventListener('resize', checkNavigationType);
    };
  }, []);

  // Handle button navigation (move the bottom navigation up temporarily)
  const handleButtonNavigation = (route: string) => {
    navigate(route);

    // Only move the navigation bar up if using button navigation
    if (isButtonNavigation) {
      setIsVisible(false); // Hide the bottom navigation temporarily
      setTimeout(() => setIsVisible(true), 300); // Show the navigation again after a short delay
    }
  };

  return (
    <div
      className={`fixed bottom-0 pb-9 left-0 right-0 bg-white border-t-2 border-zeroclick-orange/20 px-4 py-3 transition-all duration-300 ${
        isButtonNavigation ? (isVisible ? 'translate-y-0' : '-translate-y-full') : 'translate-y-0'
      }`}
    >
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentScreen === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleButtonNavigation(item.route)}
              className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-2xl transition-all ${
                isActive
                  ? 'text-zeroclick-orange'
                  : 'text-zeroclick-blue hover:bg-zeroclick-orange/10'
              }`}
              aria-label={item.label}
            >
              <IconComponent  size={24} />
              <span className="text-xs font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
