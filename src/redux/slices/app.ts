import { defaultProgressStats } from "@/lib/data/defaults";
import { getTodayWeekDay } from "@/lib/utils/getDayOfTheWeek";
import { syncStateToLocalStorage } from "@/lib/utils/localStorage";
import { generateNotification } from "@/lib/utils/notification/generateNotification";
import { WeekDay } from "@/types/clock";
import { Habits, Navigation } from "@/types/states";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
export type Progress = {
  [day in WeekDay]?: Habits[];
};

interface UpdateGoalPayload {
  name: string;
  newGoal: number;
}

interface UpdateHabitCurrentPayload {
  name: string;
  newCurrent: number;
}

interface UpdateHabitInProgressPayload {
  habit: Habits;
  day: WeekDay;
}

export interface ProgressStats {
  mind: Progress;
  nutrition: Progress;
  hydration: Progress;
  recovery: Progress;
  activity: Progress;
  hygiene: Progress;
}

export interface Settings {
  darkMode: boolean;
  pushNotifications: boolean;
  name: string | null;
  age: number;
  image: string | null;
  reminderTime: string;
}

export interface Notifications {
  id: string;
  read: boolean;
  habit: string;
  title: string;
  message: string;
  navigation: Navigation;
}

export interface State {
  habits: Habits[];
  progress: ProgressStats;
  navigation: Navigation;
  notifications: Notifications[];
  settings: Settings;
  openSidebar: boolean;
  openSetter: boolean;
  openAdder: boolean;
  openWelcomeForm: boolean;
  isNewUser: boolean;
}

// const savedHabits =
//   typeof window !== "undefined"
//     ? JSON.parse(localStorage.getItem("streakFlowHabits") || "null")
//     : null;

// const savedProgress =
//   typeof window !== "undefined"
//     ? JSON.parse(localStorage.getItem("streakFlowProgress") || "null")
//     : null;

// const savedNotifications =
//   typeof window !== "undefined"
//     ? JSON.parse(localStorage.getItem("streakFlowNotifications") || "null")
//     : null;

// const savedSettings =
//   typeof window !== "undefined"
//     ? JSON.parse(localStorage.getItem("streakFlowSettings") || "null")
//     : null;

// Initial State
const initialState: State = {
  habits: [],
  progress: defaultProgressStats,
  navigation: "dashboard",
  openSidebar: false,
  notifications: [],
  settings: {
    darkMode: false,
    pushNotifications: false,
    name: null,
    age: 18,
    image: null,
    reminderTime: "18:00",
  },
  openSetter: false,
  openAdder: false,
  openWelcomeForm: true,
  isNewUser: true,
};

// Slice
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // UI Toggles
    setNavigation(state, action: PayloadAction<Navigation>) {
      state.navigation = action.payload;
    },
    setOpenSidebar(state, action: PayloadAction<boolean>) {
      state.openSidebar = action.payload;
    },
    setOpenSetter(state, action: PayloadAction<boolean>) {
      state.openSetter = action.payload;
    },
    setOpenAdder(state, action: PayloadAction<boolean>) {
      state.openAdder = action.payload;
    },

    // Settings
    setSettings(state, action: PayloadAction<Settings>) {
      state.settings = action.payload;

      syncStateToLocalStorage(state);
    },

    // Habits
    setHabits(state, action) {
      state.habits = action.payload;

      syncStateToLocalStorage(state);
    },
    addHabit(state, action: PayloadAction<Habits>) {
      const newHabit = action.payload;
      state.habits.push(newHabit);

      const newNotification = generateNotification("add", {
        habit: newHabit.name,
        navigation: "stats",
      });

      const category = newHabit.category;

      Object.keys(state.progress[category]).forEach((day) => {
        state.progress[category][day as WeekDay]?.push(newHabit);
      });

      state.notifications.unshift(newNotification);
      syncStateToLocalStorage(state);
    },

    updateHabitGoal(state, action: PayloadAction<UpdateGoalPayload>) {
      const { name, newGoal } = action.payload;

      const habitToUpdate = state.habits.find((h) => h.name === name);
      if (!habitToUpdate) return;

      const { category } = habitToUpdate;

      state.habits = state.habits.map((h) =>
        h.name === name ? { ...h, goal: newGoal } : h
      );

      const week = state.progress[category];
      for (const day in week) {
        week[day as WeekDay] =
          week[day as WeekDay]?.map((h) =>
            h.name === name ? { ...h, goal: newGoal } : h
          ) || [];
      }

      state.notifications.unshift(
        generateNotification("goal", {
          habit: name,
          navigation: "stats",
        })
      );
      syncStateToLocalStorage(state);
    },

    updateHabitCurrent(
      state,
      action: PayloadAction<UpdateHabitCurrentPayload>
    ) {
      const { name, newCurrent } = action.payload;
      state.habits = state.habits.map((habit) =>
        habit.name === name ? { ...habit, current: newCurrent } : habit
      );
      syncStateToLocalStorage(state);
    },

    updateHabitNotify(state, action: PayloadAction<string>) {
      state.habits = state.habits.map((habit) =>
        habit.name === action.payload ? { ...habit, notify: false } : habit
      );
      syncStateToLocalStorage(state);
    },

    deleteHabit(state, action: PayloadAction<string>) {
      const nameToDelete = action.payload;
      const habitToDelete = state.habits.find((h) => h.name === nameToDelete);
      if (!habitToDelete) return;

      const { category } = habitToDelete;

      state.habits = state.habits.filter((h) => h.name !== nameToDelete);

      const week = state.progress[category];
      for (const day in week) {
        week[day as WeekDay] =
          week[day as WeekDay]?.filter((h) => h.name !== nameToDelete) || [];
      }

      state.notifications.unshift(
        generateNotification("remove", {
          habit: nameToDelete,
          navigation: "stats",
        })
      );
      syncStateToLocalStorage(state);
    },

    resetHabitsForNewDay(state) {
      const today = getTodayWeekDay();

      state.habits = state.habits.map((habit) => ({
        ...habit,
        current: 0,
        notify: true,
      }));

      for (const category in state.progress) {
        const todayHabits =
          state.progress[category as keyof ProgressStats]?.[today];
        if (todayHabits) {
          state.progress[category as keyof ProgressStats][today] =
            todayHabits.map((habit) => ({
              ...habit,
              current: 0,
              notify: true,
            }));
        }
      }
      syncStateToLocalStorage(state);
    },

    updateHabitInProgress(
      state,
      action: PayloadAction<UpdateHabitInProgressPayload>
    ) {
      const { habit, day } = action.payload;
      const { category, name, current, goal } = habit;

      const updatedHabit =
        current >= goal ? { ...habit, isCompleted: true } : habit;

      const dayHabits = state.progress[category][day];
      if (!dayHabits) return;

      state.progress[category][day] = dayHabits.map((h) =>
        h.name === name ? updatedHabit : h
      );
      syncStateToLocalStorage(state);
    },

    // Notifications
    setNotifications(state, action) {
      state.notifications = action.payload;
      syncStateToLocalStorage(state);
    },

    addNotification(state, action: PayloadAction<Notifications>) {
      state.notifications.unshift(action.payload);
      syncStateToLocalStorage(state);
    },
    markNotificationRead(state, action: PayloadAction<string>) {
      const notification = state.notifications.find(
        (n) => n.id === action.payload
      );
      if (notification) notification.read = true;
      syncStateToLocalStorage(state);
    },
    deleteNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
      syncStateToLocalStorage(state);
    },
    markAllNotificationsRead(state) {
      state.notifications.forEach((n) => (n.read = true));
      syncStateToLocalStorage(state);
    },
    clearAllNotifications(state) {
      state.notifications = [];
      syncStateToLocalStorage(state);
    },

    //Week Progress
    setProgress(state, action) {
      state.progress = action.payload;
      syncStateToLocalStorage(state);
    },
  },
});

// Actions & Reducer Export
export const {
  setNavigation,
  setOpenSidebar,
  setOpenSetter,
  setOpenAdder,
  setSettings,
  addHabit,
  updateHabitGoal,
  updateHabitCurrent,
  deleteHabit,
  addNotification,
  deleteNotification,
  clearAllNotifications,
  markAllNotificationsRead,
  updateHabitNotify,
  markNotificationRead,
  resetHabitsForNewDay,
  updateHabitInProgress,
  setHabits,
  setProgress,
  setNotifications,
} = appSlice.actions;

export default appSlice.reducer;
