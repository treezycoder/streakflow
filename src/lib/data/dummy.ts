import { Habits } from "@/types/states";

export const dummyHabits: Habits[] = [
  {
    name: "Meditation",
    category: "mind",
    goal: 30, // in minutes
    current: 10,
    completed: false,
    dateAdded: new Date("2025-05-01").toISOString(),
  },
  {
    name: "Drink Water",
    category: "hydration",
    goal: 2, // in litres
    current: 2,
    completed: true,
    dateAdded: new Date("2025-05-05").toISOString(),
  },
];
