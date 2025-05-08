import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/useOutSideClick";
import {
  addNotification,
  Notifications,
  updateHabitNotify,
} from "@/redux/slices/app";

export const useNotificationReminder = () => {
  const dispatch = useAppDispatch();
  const { habits, settings } = useAppSelector((state) => state.app);

  const checkAndGenerateNotifications = () => {
    const today = new Date();
    const todayTime = today.getTime();
    // Parse the reminderTime safely
    const [hourStr, minuteStr] = settings.reminderTime?.split(":") || [];
    const hours = Number(hourStr);
    const minutes = Number(minuteStr);

    if (isNaN(hours) || isNaN(minutes)) {
      console.warn("Invalid reminder time format:", settings.reminderTime);
      return;
    }

    const reminderDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      hours,
      minutes
    );

    const reminderTime = reminderDate.getTime();

    const timePassed = todayTime >= reminderTime;
    // console.log(
    //   `today's time: ${todayTime}`,
    //   `reminder's time: ${reminderTime}`,
    //   `time has passed: ${timePassed}`
    // );

    if (timePassed) {
      habits.forEach((habit) => {
        if (habit.notify && habit.current < habit.goal) {
          const notification: Notifications = {
            id: `${habit.name}-${today.getTime()}`,
            read: false,
            habit: habit.name,
            title: `${habit.name} Reminder`,
            message: `You haven't completed your ${habit.name} habit yet.`,
            navigation: "log",
          };

          dispatch(addNotification(notification));
          dispatch(updateHabitNotify(habit.name));
        }
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkAndGenerateNotifications();
      console.log("Checking for habit reminders...");
    }, 60000);

    return () => clearInterval(interval);
  }, [habits, settings.reminderTime, dispatch]);
};
