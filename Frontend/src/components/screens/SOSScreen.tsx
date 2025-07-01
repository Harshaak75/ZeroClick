
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';

const SOSScreen = () => {
  const navigate = useNavigate();
  const [alertSent, setAlertSent] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSOSPress = () => {
    setShowConfirmation(true);
  };

  const confirmSOS = () => {
    setAlertSent(true);
    setShowConfirmation(false);
    // In real app, this would trigger actual emergency response
    console.log('SOS Alert Sent!');
  };

  const cancelSOS = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="min-h-screen pb-[5rem] bg-gradient-to-br from-red-50 to-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-12 pb-6">
        <button 
          onClick={() => navigate('/')}
          className="bg-white rounded-full p-3 shadow-md"
        >
          <ArrowLeft size={24} className="text-zeroclick-blue" />
        </button>
        <h1 className="text-2xl font-bold text-red-600">🆘 Emergency</h1>
        <div className="w-12"></div>
      </div>

      {!alertSent && !showConfirmation && (
        <div className="flex flex-col items-center justify-center px-8 py-12">
          {/* Main SOS Button */}
          <div className="mb-8">
            <button
              onClick={handleSOSPress}
              className="sos-button w-[10rem] h-[10rem] flex items-center justify-center"
              aria-label="Emergency SOS Button"
            >
              <div className="text-center">
                <div className="text-7xl mb-2">🆘</div>
                {/* <span className="text-white font-bold text-4xl">SOS</span> */}
              </div>
            </button>
          </div>

          <p className="text-center text-lg text-gray-700 mb-8 font-medium">
            Press and hold for emergency help
          </p>

          {/* Location Info */}
          <div className="bg-white rounded-2xl p-6 w-full shadow-lg mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <MapPin size={28} className="text-zeroclick-orange" />
              <h3 className="text-xl font-bold text-zeroclick-blue">📍 Your Location</h3>
            </div>
            <p className="text-zeroclick-blue/80 text-lg">
              Koramangala, Bengaluru<br />
              Karnataka, India 560034
            </p>
          </div>

          {/* Emergency Contact */}
          <div className="bg-white rounded-2xl p-6 w-full shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <Phone size={28} className="text-green-600" />
              <h3 className="text-xl font-bold text-zeroclick-blue">👨‍⚕️ Emergency Contact</h3>
            </div>
            <p className="text-zeroclick-blue/80 text-lg">
              Dr. Rajesh Kumar<br />
              📞 +91 98765 43210
            </p>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="flex flex-col items-center justify-center px-8 py-12">
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                Send Emergency Alert?
              </h2>
              <p className="text-lg text-gray-700">
                This will notify your emergency contacts and local authorities
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={confirmSOS}
                className="flex flex-col bg-red-600 text-white rounded-2xl p-4 font-bold text-[1.05rem]"
              >
                 Yes, Send Alert
              </button>
              <button
                onClick={cancelSOS}
                className="flex-1 bg-gray-300 text-gray-700 rounded-2xl p-4 font-bold text-lg"
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alert Sent Confirmation */}
      {alertSent && (
        <div className="flex flex-col items-center justify-center px-8 py-12">
          <div className="bg-white rounded-3xl p-8 shadow-2xl text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Alert Sent Successfully!
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Help is on the way. Your location has been shared with emergency contacts.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-zeroclick-orange text-white rounded-2xl px-8 py-4 font-bold text-lg"
            >
              🏠 Return Home
            </button>
          </div>
        </div>
      )}

      <BottomNavigation currentScreen="sos" />
    </div>
  );
};

export default SOSScreen;
