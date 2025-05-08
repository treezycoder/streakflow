import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setHabits,
  setNotifications,
  setProgress,
  setSettings,
} from "@/redux/slices/app";

export const useLocalStorageSync = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedSettings = JSON.parse(
      localStorage.getItem("streakFlowSettings") || "null"
    );

    const savedHabits = JSON.parse(
      localStorage.getItem("streakFlowHabits") || "null"
    );

    const savedProgress = JSON.parse(
      localStorage.getItem("streakFlowProgress") || "null"
    );

    const savedNotifications = JSON.parse(
      localStorage.getItem("streakFlowNotifications") || "null"
    );

    if (savedSettings && savedHabits && savedNotifications && savedProgress) {
      dispatch(setSettings(savedSettings));
      dispatch(setProgress(savedProgress));
      dispatch(setHabits(savedHabits));
      dispatch(setNotifications(savedNotifications));
    }

    // console.log(savedSettings);
  }, [dispatch]);
};
