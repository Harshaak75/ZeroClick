
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePersistedLanguage } from '@/hooks/usePersistedLanguage';

interface Feature {
  id: string;
  icon: string;
  title: string;
  route: string;
  bgColor: string;
}

const features: Feature[] = [
  {
    id: 'reminders',
    icon: '📅',
    title: 'Reminders',
    route: '/reminders',
    bgColor: 'bg-zeroclick-mint'
  },
  {
    id: 'sos',
    icon: '🆘',
    title: 'SOS',
    route: '/sos',
    bgColor: 'bg-zeroclick-red'
  },
  {
    id: 'news',
    icon: '📰',
    title: 'News',
    route: '/news',
    bgColor: 'bg-zeroclick-light-blue'
  },
  {
    id: 'horoscope',
    icon: '🔮',
    title: 'Horoscope',
    route: '/horoscope',
    bgColor: 'bg-purple-400'
  },
  {
    id: 'health',
    icon: '❤️',
    title: 'Health Tips',
    route: '/health',
    bgColor: 'bg-pink-400'
  },
  {
    id: 'summary',
    icon: '📊',
    title: 'Daily Summary',
    route: '/summary',
    bgColor: 'bg-zeroclick-yellow'
  }
];

const FeatureGrid = () => {
  const navigate = useNavigate();
  usePersistedLanguage();
  const {t} = useTranslation();

  return (
    <div className="px-4 mb-20">
      <div className="grid grid-cols-2 gap-4">
        {features.map((feature) => (
          <button
            key={feature.id}
            onClick={() => navigate(feature.route)}
            className="feature-card min-h-[120px] flex flex-col items-center justify-center space-y-3 active:scale-95 transition-transform"
            aria-label={`Go to ${feature.title}`}
          >
            <div className={`${feature.bgColor} rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-md`}>
              {feature.icon}
            </div>
            <span className="text-lg font-bold text-zeroclick-blue text-center">
              {t(feature.title)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeatureGrid;
