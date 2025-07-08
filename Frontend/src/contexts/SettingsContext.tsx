import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type LanguageId = 'english' | 'hindi' | 'kannada';

type SettingsContextType = {
  selectedLanguage: LanguageId;
  setSelectedLanguage: (lang: LanguageId) => void;
  voiceSpeed: number;
  setVoiceSpeed: (speed: number) => void;
  volume: number;
  setVolume: (vol: number) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageId>('english');
  const [voiceSpeed, setVoiceSpeed] = useState<number>(50);
  const [volume, setVolume] = useState<number>(80);

  return (
    <SettingsContext.Provider
      value={{
        selectedLanguage,
        setSelectedLanguage,
        voiceSpeed,
        setVoiceSpeed,
        volume,
        setVolume,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};