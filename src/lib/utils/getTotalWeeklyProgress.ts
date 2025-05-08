import { Progress } from "@/redux/slices/app";

/**
 * Calculates the total weekly progress for a given habit name.
 *
 * @param name - The name of the habit to calculate progress for.
 * @param weeklyProgress - The progress data grouped by day.
 * @returns The total accumulated progress value for the given habit.
 */
export function getTotalWeeklyProgress(
  name: string,
  weeklyProgress: Progress
): number {
  return Object.values(weeklyProgress).reduce((total, habitsForDay) => {
    const match = habitsForDay?.find((h) => h.name === name);
    return match ? total + match.current : total;
  }, 0);
}
