// src/utils/reminderStorage.ts
import { Preferences } from '@capacitor/preferences';

export interface Reminder {
  id: string;
  title: string;
  time: string;
  category: 'medicine' | 'call' | 'yoga';
  icon: string;
  completed: boolean;
}

const REMINDER_KEY = 'reminders';

// Save reminders to storage
export const saveReminders = async (reminders: Reminder[]) => {
  await Preferences.set({
    key: REMINDER_KEY,
    value: JSON.stringify(reminders),
  });
};

// Load reminders from storage
export const loadReminders = async (): Promise<Reminder[]> => {
  const { value } = await Preferences.get({ key: REMINDER_KEY });
  return value ? JSON.parse(value) : [];
};
