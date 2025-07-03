import { useState, useRef, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { SpeechRecognition as CapSpeech } from '@capacitor-community/speech-recognition';


const createWebRecognizer = (): SpeechRecognition | null => {
  const Ctor: any =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  return Ctor ? new Ctor() : null;
};

export const useVoiceRecording = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const webRecognizerRef = useRef<any>(null);
  const platform = Capacitor.getPlatform(); // "web", "android", "ios"

  const ensurePermission = async () => {
    const { available } = await CapSpeech.available();
    if (!available) {
      alert('Speech recognition not available on this device.');
      return false;
    }

    const perm = await CapSpeech.checkPermissions();
    if (perm.speechRecognition !== 'granted') {
      const requested = await CapSpeech.requestPermissions();
      if (requested.speechRecognition !== 'granted') {
        alert('Permission denied');
        return false;
      }
    }
    return true;
  };

  const startListening = async () => {
    if (isListening) return;

    if (platform === 'web') {
      const rec = createWebRecognizer();
      if (!rec) {
        alert('SpeechRecognition is not supported in this browser.');
        return;
      }
      webRecognizerRef.current = rec;

      rec.lang = 'en-US';
      rec.continuous = false;
      rec.interimResults = false;

      rec.onstart = () => setIsListening(true);
      rec.onresult = (e: SpeechRecognitionEvent) => {
        const text = Array.from(e.results)
          .map(r => r[0].transcript)
          .join(' ');
        setTranscript(text.trim());
        setIsListening(false);
      };
      rec.onerror = () => setIsListening(false);
      rec.onend = () => setIsListening(false);

      rec.start();
      return;
    } if (!(await ensurePermission())) return;

    setIsListening(true);
    try {
      const { matches } = await CapSpeech.start({
        language: 'en-US',
        maxResults: 1,
        partialResults: false,
        prompt: 'Speak now…',
        popup: true,
      });
      if (matches && matches.length) setTranscript(matches[0]);
    } catch (err) {
      console.error('Native SR error:', err);
    } finally {
      setIsListening(false);
    }
  };

  const stopListening = async () => {
    if (!isListening) return;
    if (platform === 'web') {
      webRecognizerRef.current?.stop();
    } else {
      await CapSpeech.stop();
    }
    setIsListening(false);
  };

  useEffect(() => {
    return () => {
      CapSpeech.removeAllListeners();
      if (webRecognizerRef.current) {
        webRecognizerRef.current.stop();
      }
    };
  }, []);

  return {
    isListening,
    transcript,
    setTranscript,
    startListening,
    stopListening,
  };
};
