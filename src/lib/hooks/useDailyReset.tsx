import { getTodayWeekDay } from "@/lib/utils/getDayOfTheWeek";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks/useOutSideClick";
import {
  resetHabitsForNewDay,
  updateHabitInProgress,
} from "@/redux/slices/app";

const LOCAL_KEY = "lastResetDay";

export const useDailyReset = () => {
  const dispatch = useDispatch();
  const { habits } = useAppSelector((state) => state.app);

  useEffect(() => {
    const today = getTodayWeekDay();
    const lastDay = localStorage.getItem(LOCAL_KEY);

    if (lastDay !== today) {
      dispatch(resetHabitsForNewDay()); // this reducer will handle current = 0, notify = true
      localStorage.setItem(LOCAL_KEY, today);
    }

    habits.forEach((habit) => {
      dispatch(updateHabitInProgress({ habit, day: today }));
    });
  }, [dispatch, habits]);
};
