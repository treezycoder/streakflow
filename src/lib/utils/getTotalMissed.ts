import { Progress } from "@/redux/slices/app";
import { weekDays } from "../data/defaults";

export function calculateTotalMissed(
  habitName: string,
  weeklyProgress: Progress
): number {
  let missed = 0;

  for (const day of weekDays) {
    const habitsForDay = weeklyProgress[day];
    const matchedHabit = habitsForDay?.find((h) => h.name === habitName);

    if (matchedHabit && matchedHabit.current < matchedHabit.goal) {
      missed++;
    }
  }

  return missed;
}
