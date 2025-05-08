import { Progress, ProgressStats } from "@/redux/slices/app";
import { WeekDay } from "@/types/clock";
import { Categories, Habits } from "@/types/states";
import {
  FiActivity,
  FiDroplet,
  FiShield,
  FiFeather,
  FiCoffee,
  FiHeart,
} from "react-icons/fi";

export const defaultProgressData: Progress = {
  mon: [],
  tue: [],
  wed: [],
  thu: [],
  fri: [],
  sat: [],
  sun: [],
};

export const defaultProgressStats: ProgressStats = {
  mind: defaultProgressData,
  nutrition: defaultProgressData,
  hydration: defaultProgressData,
  recovery: defaultProgressData,
  activity: defaultProgressData,
  hygiene: defaultProgressData,
};

export const dummyHabits: Habits[] = [
  {
    name: "Meditation",
    category: "mind",
    goal: 30,
    current: 30,
    completed: true,
    dateAdded: new Date("2025-05-01").toISOString(),
  },
  {
    name: "Read",
    category: "mind",
    goal: 15,
    current: 30,
    completed: true,
    dateAdded: new Date("2025-05-01").toISOString(),
  },
  {
    name: "sleep",
    category: "mind",
    goal: 15,
    current: 30,
    completed: true,
    dateAdded: new Date("2025-05-01").toISOString(),
  },
  {
    name: "Brainstorm",
    category: "mind",
    goal: 15,
    current: 90,
    completed: true,
    dateAdded: new Date("2025-05-01").toISOString(),
  },
  {
    name: "Drink Water",
    category: "hydration",
    goal: 2,
    current: 1.5,
    completed: false,
    dateAdded: new Date("2025-05-05").toISOString(),
  },
  {
    name: "Push‑ups",
    category: "activity",
    goal: 50,
    current: 25,
    completed: false,
    dateAdded: new Date("2025-05-03").toISOString(),
  },
];

// export const defaultProgress: Progress = {
//   mon: [
//     { ...dummyHabits[0], current: 20, completed: false },
//     { ...dummyHabits[1], current: 2, completed: true },
//   ],
//   tue: [
//     { ...dummyHabits[0], current: 30, completed: true },
//     { ...dummyHabits[2], current: 50, completed: true },
//   ],
//   wed: [
//     { ...dummyHabits[1], current: 1, completed: false },
//     { ...dummyHabits[2], current: 30, completed: false },
//   ],
//   thu: [],
//   fri: [
//     { ...dummyHabits[0], current: 15, completed: false },
//     { ...dummyHabits[1], current: 2, completed: true },
//     { ...dummyHabits[2], current: 50, completed: true },
//   ],
//   sat: [],
//   sun: [{ ...dummyHabits[0], current: 30, completed: true }],
// };

// export const defaultProgressStats: ProgressStats = {
//   mind: defaultProgress,
//   nutrition: { ...defaultProgress }, // copy if you want separate setup
//   hydration: defaultProgress,
//   recovery: defaultProgress,
//   activity: defaultProgress,
//   hygiene: defaultProgress,
// };

export const weekDays: WeekDay[] = [
  "sun",
  "sat",
  "fri",
  "thu",
  "wed",
  "tue",
  "mon",
];

export const categoryList: Categories[] = [
  "activity",
  "hydration",
  "hygiene",
  "mind",
  "nutrition",
  "recovery",
];

export const categoryIcons: { [key: string]: React.ReactNode } = {
  activity: <FiActivity className="text-blue-500" />,
  hydration: <FiDroplet className="text-cyan-500" />,
  hygiene: <FiShield className="text-yellow-500" />,
  mind: <FiFeather className="text-purple-500" />,
  nutrition: <FiCoffee className="text-amber-600" />,
  recovery: <FiHeart className="text-red-500" />,
};
