import axios from "axios";

export interface ParsedReminder {
  title: string;
  time: string;
  category: "medicine" | "call" | "yoga";
}

export const parseReminder = async (text: string): Promise<ParsedReminder> => {
  const prompt = `
Text: "${text}"
Extract the following as JSON:
- title
- time (hh:mm AM/PM)
- category (medicine, call, yoga)
Only output valid JSON.`;

  const res = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
    {
      contents: [{ parts: [{ text: prompt }] }],
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": "AIzaSyAvmRqeiPH-rONuJimIPo7GaTlykTdJkl4",
      },
    }
  );

  const raw = res.data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  const match = raw.match(/```json\s*([\s\S]*?)\s*```/);
  if (!match) throw new Error("Invalid Gemini output");

  return JSON.parse(match[1]);
};
