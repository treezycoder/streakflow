import { Habits } from "@/types/states";
import { generateRandomKey } from "./generateRandomKey";

export const getDefaultHabitKeys = (
  habits: Habits[]
): Record<string, number> => {
  let currentKeys = {};
  for (let i = 0; i < habits.length; i++) {
    const habitName = habits[i].name;
    const key = generateRandomKey();
    currentKeys = { ...currentKeys, [habitName]: key };
  }

  return currentKeys;
};
