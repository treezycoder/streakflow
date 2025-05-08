/* eslint-disable @typescript-eslint/no-explicit-any */

import { ProgressStats } from "@/redux/slices/app";
import { WeekDay } from "@/types/clock";
import { Habits } from "@/types/states";
import { weekDays } from "../data/defaults";
import { DayTime } from "@/types/greeting";
import { getTotalCompletedAndMissed } from "./getDayCounts";

export function flattenProgress(progress: ProgressStats): Habits[] {
  return Object.values(progress).flatMap((category) =>
    Object.values(category).flatMap((entries) =>
      Array.isArray(entries) ? entries.filter(isHabit) : []
    )
  );
}

function isHabit(obj: any): obj is Habits {
  return (
    obj &&
    typeof obj.name === "string" &&
    typeof obj.category === "string" &&
    typeof obj.goal === "number" &&
    typeof obj.current === "number"
  );
}

export function getGeneralStats(progress: ProgressStats, habits: Habits[]) {
  const flatHabits = flattenProgress(progress);
  const totalLogged = flatHabits.length;
  const totalHabits = habits.length;
  const totalHours = flatHabits.reduce((acc, h) => acc + h.current, 0);
  const periodFrequency = new Map<DayTime, number>();
  const habitFrequency = new Map<string, number>();
  const dayFrequency = new Map<WeekDay, number>();
  const categoryFrequency = new Map<string, number>();

  for (const category of Object.keys(progress) as (keyof ProgressStats)[]) {
    for (const day of weekDays) {
      const dayHabits = progress[category][day] || [];
      if (!dayFrequency.has(day)) dayFrequency.set(day, 0);
      dayFrequency.set(day, dayFrequency.get(day)! + dayHabits.length);

      for (const h of dayHabits) {
        habitFrequency.set(h.name, (habitFrequency.get(h.name) || 0) + 1);
        categoryFrequency.set(
          h.category,
          (categoryFrequency.get(h.category) || 0) + 1
        );

        if (h.dayTime) {
          periodFrequency.set(
            h.dayTime,
            (periodFrequency.get(h.dayTime) || 0) + 1
          );
        }
      }
    }
  }

  const mostPerformedHabit =
    [...habitFrequency.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "-";
  const leastPerformedHabit =
    [...habitFrequency.entries()].sort((a, b) => a[1] - b[1])[0]?.[0] ?? "-";
  const mostUsedCategory =
    [...categoryFrequency.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "-";
  const mostActiveDay =
    [...dayFrequency.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "-";
  const mostActivePeriod =
    [...periodFrequency.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "-";
  const { completed, missed } = getTotalCompletedAndMissed(progress);
  const totalMissedDays = missed;
  const totalCompletedDays = completed;
  return {
    mostPerformedHabit,
    totalHours,
    totalHabits,
    totalMissedDays,
    totalCompletedDays,
    mostUsedCategory,
    leastPerformedHabit,
    mostActiveDay,
    totalLogged,
    mostActivePeriod,
  };
}
