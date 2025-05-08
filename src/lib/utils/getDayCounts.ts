import { ProgressStats } from "@/redux/slices/app";
import { weekDays } from "../data/defaults";

// This function calculates the total completed and missed days across all categories
export function getTotalCompletedAndMissed(progressStats: ProgressStats) {
  let completed = 0;
  let missed = 0;

  for (const day of weekDays) {
    let dayIsComplete = true;

    for (const categoryKey in progressStats) {
      const category = progressStats[categoryKey as keyof ProgressStats];
      const habitsForDay = category[day];

      // If the day data doesn't exist or is empty, treat as incomplete
      if (!habitsForDay || habitsForDay.length === 0) {
        dayIsComplete = false;
        break;
      }

      // If any habit for this day in this category is not completed, mark as incomplete
      const allHabitsComplete = habitsForDay.every(
        (habit) => habit.current >= habit.goal
      );
      if (!allHabitsComplete) {
        dayIsComplete = false;
        break;
      }
    }

    if (dayIsComplete) {
      completed++;
    } else {
      missed++;
    }
  }

  return { completed, missed };
}
