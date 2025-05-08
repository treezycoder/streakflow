import { Progress } from "@/redux/slices/app";
import { weekDays } from "../data/defaults";

export function calculateTotalCompleted(
  habitName: string,
  weeklyProgress: Progress
): number {
  let completed = 0;

  for (const day of weekDays) {
    const habitsForDay = weeklyProgress[day];
    const matchedHabit = habitsForDay?.find((h) => h.name === habitName);

    if (matchedHabit && matchedHabit.current >= matchedHabit.goal) {
      completed++;
    }
  }

  return completed;
}
