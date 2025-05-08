import { DayTime } from "./greeting";

export type Habits = {
  id?: string;
  name: string;
  category: Categories;
  goal: number;
  current: number;
  completed?: boolean;
  dateAdded?: string;
  dayTime?: DayTime; // morning  // afternoon // evening
  notify?: boolean;
};

export type Categories =
  | "mind"
  | "nutrition"
  | "hydration"
  | "recovery"
  | "activity"
  | "hygiene";

export type Navigation = "dashboard" | "settings" | "stats" | "log";
