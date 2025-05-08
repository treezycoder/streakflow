import { Notifications } from "@/redux/slices/app";
import { Navigation } from "@/types/states";
import { v4 as uuidv4 } from "uuid"; // for unique ID generation

type NotificationType = "add" | "remove" | "goal";

interface NotificationOptions {
  habit: string;
  navigation?: Navigation;
  customTitle?: string;
  customMessage?: string;
}

/**
 * Utility to generate a standardized notification object.
 */
export function generateNotification(
  type: NotificationType,
  options: NotificationOptions
): Notifications {
  const {
    habit,
    navigation = "dashboard",
    customTitle,
    customMessage,
  } = options;

  let title = "";
  let message = "";

  switch (type) {
    case "add":
      title = customTitle || "New Habit Added";
      message = customMessage || `You added the habit "${habit}". Keep it up!`;
      break;

    case "remove":
      title = customTitle || "Habit Removed";
      message = customMessage || `You removed the habit "${habit}".`;
      break;

    case "goal":
      title = customTitle || "Daily Goal Updated";
      message = customMessage || `You updated the daily goal for "${habit}".`;
      break;

    default:
      title = "Notification";
      message = "Something happened.";
  }

  return {
    id: uuidv4(),
    read: false,
    habit,
    title,
    message,
    navigation,
  };
}
