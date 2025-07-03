import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mic, Trash2 } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
// import { useVoiceRecording } from "@/hooks/useVoiceRecording";
import { useNativeSpeech } from "@/hooks/useNativeSpeech";
import { v4 as uuidv4 } from "uuid";
import { parseReminder } from "@/hooks/parseReminder";
import { saveReminders, loadReminders } from "@/utiles/reminderStorage";

interface Reminder {
  id: string;
  title: string;
  time: string;
  category: "medicine" | "call" | "yoga";
  icon: string;
  completed: boolean;
}

const ReminderScreen = () => {
  const navigate = useNavigate();

  const { isListening, transcript, startListening, stopListening } =
    useNativeSpeech();

  const [reminders, setReminders] = useState<Reminder[]>([
    // {
    //   id: "1",
    //   title: "Take Blood Pressure Medicine",
    //   time: "2:00 PM",
    //   category: "medicine",
    //   icon: "💊",
    //   completed: false,
    // },
    // {
    //   id: "2",
    //   title: "Call Dr. Sharma",
    //   time: "3:30 PM",
    //   category: "call",
    //   icon: "📞",
    //   completed: false,
    // },
    // {
    //   id: "3",
    //   title: "Evening Yoga Session",
    //   time: "6:00 PM",
    //   category: "yoga",
    //   icon: "🧘",
    //   completed: true,
    // },
  ]);

  useEffect(() => {
    loadReminders().then(setReminders);
  }, []);

  useEffect(() => {
    saveReminders(reminders);
  }, [reminders]);

  useEffect(() => {
    if (transcript.trim()) {
      // Basic keyword-to-category detection
      let category: Reminder["category"] = "medicine";
      // if (/yoga/i.test(transcript)) category = "yoga";
      // else if (/call/i.test(transcript)) category = "call";

      parseReminder(transcript).then((data) => {
        const newReminder: Reminder = {
          id: uuidv4(),
          title: data.title,
          time: data.time,
          category: data.category,
          icon:
            data.category === "medicine"
              ? "💊"
              : data.category === "call"
              ? "📞"
              : "🧘",
          completed: false,
        };

        setReminders((prev) => [...prev, newReminder]);
      });
      stopListening();
    }
  }, [transcript]);

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  const toggleComplete = (id: string) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );
  };

  return (
    <div className="min-h-screen pb-[2.6rem] bg-gradient-to-br from-zeroclick-peach to-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-12 pb-6">
        <button
          onClick={() => navigate("/")}
          className="bg-white rounded-full p-3 shadow-md"
        >
          <ArrowLeft size={24} className="text-zeroclick-blue" />
        </button>
        <h1 className="text-2xl font-bold text-zeroclick-blue">📅 Reminders</h1>
        <div className="w-12"></div>
      </div>

      {/* Voice Input Button */}
      <div className="px-6 mb-6">
        <button
          onClick={startListening}
          className={`w-full bg-zeroclick-orange rounded-2xl p-4 flex items-center justify-center space-x-3 shadow-lg ${
            isListening ? "animate-pulse" : ""
          }`}
        >
          <Mic size={28} className="text-white" />
          <span className="text-white font-bold text-lg">
            {isListening ? "🎙️ Listening..." : "🎤 Speak a Reminder"}
          </span>
        </button>
      </div>

      {/* Reminders List */}
      <div className="px-6 mb-20">
        <h2 className="text-[1.7rem] font-bold text-zeroclick-blue mb-4">
          Today's Reminders
        </h2>

        {reminders.map((reminder) => (
          <div
            key={reminder.id}
            className={`reminder-card reminder-${reminder.category} mb-4 ${
              reminder.completed ? "opacity-60" : ""
            }`}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{reminder.icon}</div>
                <div className="">
                  <h3
                    className={`font-bold text-zeroclick-blue ${
                      reminder.completed ? "line-through" : ""
                    }`}
                  >
                    {reminder.title}
                  </h3>
                  <p className="text-zeroclick-blue/70">{reminder.time}</p>
                </div>
              </div>

              <div className="flex items-center justify-between space-x-2">
                <button
                  onClick={() => toggleComplete(reminder.id)}
                  className={`px-4 py-2 text-[1rem] rounded-full font-bold ${
                    reminder.completed
                      ? " text-green-800"
                      : " text-zeroclick-blue"
                  }`}
                >
                  {reminder.completed ? "✅ Done" : "⏰ Pending"}
                </button>

                <button
                  onClick={() => deleteReminder(reminder.id)}
                  className="bg-red-100 p-2 rounded-full hover:bg-red-200"
                >
                  <Trash2 size={20} className="text-red-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNavigation currentScreen="reminders" />
    </div>
  );
};

export default ReminderScreen;
