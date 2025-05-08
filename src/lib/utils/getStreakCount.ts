import { Progress } from "@/redux/slices/app";
import { weekDays } from "../data/defaults";

export function getStreakCount(
  habitName: string,
  weeklyProgress: Progress
): number {
  let streak = 0;

  for (const day of weekDays) {
    const habitsForDay = weeklyProgress[day];
    const matchedHabit = habitsForDay?.find((h) => h.name === habitName);

    if (matchedHabit && matchedHabit.current >= matchedHabit.goal) {
      streak++;
    } else {
      break; // Streak ends if goal not met or no record
    }
  }

  return streak;
}
