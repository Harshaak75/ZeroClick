import { useEffect, useRef, useState } from "react";
import { SpeechRecognition } from "@capacitor-community/speech-recognition";

export const useNativeSpeech = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState<string>("");

  // ✅ Use a ref to persist latest final transcript
  const finalTranscriptRef = useRef("");

  const startListening = async () => {
    try {
      const available = await SpeechRecognition.available();
      if (!available.available) {
        console.warn("Speech recognition not available");
        return;
      }

      await SpeechRecognition.requestPermissions();
      setTranscript("");
      setIsListening(true);
      finalTranscriptRef.current = ""; // reset before starting

      await SpeechRecognition.start({
        language: "en-IN",
        partialResults: true,
        popup: false,
      });

      SpeechRecognition.addListener("partialResults", (result) => {
        if (result.matches && result.matches.length > 0) {
          finalTranscriptRef.current = result.matches[0];
        }
      });

      SpeechRecognition.addListener("listeningState", (data) => {
        if (data.status === "stopped") {
          setIsListening(false);
          const finalText = finalTranscriptRef.current.trim();
          if (finalText) {
            setTranscript(finalText);
          }
        }
      });
    } catch (err) {
      console.error("Speech recognition error:", err);
      alert("Speech recognition failed. Please check permissions and try again.");
    }
  };

  const stopListening = async () => {
    await SpeechRecognition.stop();
    setIsListening(false);
  };

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
  };
};


// how are yiu