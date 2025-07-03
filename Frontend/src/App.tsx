
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./components/screens/HomeScreen";
import ReminderScreen from "./components/screens/ReminderScreen";
import SOSScreen from "./components/screens/SOSScreen";
import NewsScreen from "./components/screens/NewsScreen";
import HoroscopeScreen from "./components/screens/HoroscopeScreen";
import HealthTipsScreen from "./components/screens/HealthTipsScreen";
import DailySummaryScreen from "./components/screens/DailySummaryScreen";
import SettingsScreen from "./components/screens/SettingsScreen";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import Shake from "shake.js"

const queryClient = new QueryClient();



const App = () => {
  useEffect(() => {
    const shakeEvent = new Shake({ threshold: 15 });
    shakeEvent.start();

    const onShake = () => {
      console.log("Phone shaken");
    };

    window.addEventListener("shake", onShake);

    return () => {
      window.removeEventListener("shake", onShake);
      shakeEvent.stop();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen zeroclick-gradient">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/reminders" element={<ReminderScreen />} />
              <Route path="/sos" element={<SOSScreen />} />
              <Route path="/news" element={<NewsScreen />} />
              <Route path="/horoscope" element={<HoroscopeScreen />} />
              <Route path="/health" element={<HealthTipsScreen />} />
              <Route path="/summary" element={<DailySummaryScreen />} />
              <Route path="/settings" element={<SettingsScreen />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

// how are you