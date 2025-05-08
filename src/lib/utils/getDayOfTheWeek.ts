import { WeekDay } from "@/types/clock";

// export const getTodayWeekDay = (): WeekDay => {
//   return weekDays[new Date().getDay()];
// };

export const getTodayWeekDay = (): WeekDay => {
  const date = new Date();
  const weekday = date.toLocaleDateString("en-US", {
    weekday: "short",
  });
  return weekday.toLowerCase() as WeekDay; // e.g., "mon", "tue", etc.
};
