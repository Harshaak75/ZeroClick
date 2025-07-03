import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';

declare global {
  interface Window {
    TTS?: any;
  }
}

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const isWeb = Capacitor.getPlatform() === 'web';

  useEffect(() => {
    if (!isWeb) return;

    if (!('speechSynthesis' in window)) {
      console.warn('🔇 Speech synthesis is not supported on this platform.');
      return;
    }

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, [isWeb]);

  const speak = (text: string, options?: { rate?: number; volume?: number }) => {
    if (isWeb) {
      // ✅ Web TTS
      if (!('speechSynthesis' in window)) {
        console.warn('🔇 Speech synthesis is not available.');
        return;
      }

      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }

      const utterance = new SpeechSynthesisUtterance(text);

      const englishVoice = voices.find(voice =>
        voice.lang.includes('en') && voice.name.toLowerCase().includes('female')
      ) || voices.find(voice => voice.lang.includes('en'));

      if (englishVoice) {
        utterance.voice = englishVoice;
      }

      utterance.rate = options?.rate || 0.8;
      utterance.volume = options?.volume || 0.9;
      utterance.pitch = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } else {
      // ✅ Native TTS (Capacitor + Android)
      if (typeof window.TTS !== 'undefined') {
        window.TTS.speak(
          {
            text,
            locale: 'en-IN',
            rate: 1.0,
          },
          () => {
            setIsSpeaking(false);
            console.log('✅ Native TTS finished');
          },
          (err: any) => {
            console.error('❌ Native TTS error:', err);
            setIsSpeaking(false);
          }
        );
        setIsSpeaking(true);
      } else {
        console.warn('❌ TTS plugin not available on native');
      }
    }
  };

  const stop = () => {
    if (isWeb && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  return { speak, stop, isSpeaking, voices };
};

// how are you