import { Habits } from "@/types/states";

export const getDefaultLogs = (habits: Habits[]): Record<string, number> => {
  return habits.reduce((acc, habit) => {
    acc[habit.name] = habit.current;
    return acc;
  }, {} as Record<string, number>);
};
