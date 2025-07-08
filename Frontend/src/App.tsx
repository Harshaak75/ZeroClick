import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import HomeScreen from "./components/screens/HomeScreen";
import ReminderScreen from "./components/screens/ReminderScreen";
import SOSScreen from "./components/screens/SOSScreen";
import NewsScreen from "./components/screens/NewsScreen";
import HoroscopeScreen from "./components/screens/HoroscopeScreen";
import HealthTipsScreen from "./components/screens/HealthTipsScreen";
import DailySummaryScreen from "./components/screens/DailySummaryScreen";
import SettingsScreen from "./components/screens/SettingsScreen";
import NotFound from "./pages/NotFound";

import Shake from "shake.js";
import { Mic } from "lucide-react";
import { useVoiceRecording } from "./hooks/useVoiceRecording"; // adjust the path

// language convertion
import '../src/i18n'
// import { AppNavigation } from './src/navigation/AppNavigation'; 

const queryClient = new QueryClient();

// Wrapper needed to use `useNavigate` outside of routes
const AppInner = () => {
  const navigate = useNavigate();
  const { isListening, transcript,setTranscript, startListening } = useVoiceRecording();

  // Shake detection
  useEffect(() => {
    const shakeEvent = new Shake({ threshold: 10 });
    shakeEvent.start();

    const onShake = () => {
      console.log("Phone shaken");
      // You could optionally trigger voice or SOS navigation here
      startListening();
    };

    window.addEventListener("shake", onShake);
    return () => {
      window.removeEventListener("shake", onShake);
      shakeEvent.stop();
    };
  }, []);

  // Transcript-based navigation
  useEffect(() => {
    if (!transcript) return;
    const lower = transcript.toLowerCase();

    if (lower.includes("reminder") || lower.includes("task")) navigate("/reminders");
    else if (lower.includes("sos")) navigate("/sos");
    else if (lower.includes("news")) navigate("/news");
    else if (lower.includes("horoscope")) navigate("/horoscope");
    else if (lower.includes("health")) navigate("/health");
    else if (lower.includes("summary")) navigate("/summary");
    else if (lower.includes("settings") || lower.includes("setting")) navigate("/settings");
    else if (lower.includes("home")) navigate("/");

    setTranscript("");
  }, [transcript, navigate, setTranscript]);

  return (
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

      {/* Floating Mic Button */}
      <button
        onClick={startListening}
        className="fixed bottom-[8rem] right-6 z-50 bg-zeroclick-orange text-white p-4 rounded-full shadow-xl hover:scale-105 transition-all"
      >
        <Mic className={`w-6 h-6 ${isListening ? "animate-pulse text-red-500" : ""}`} />
      </button>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppInner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
