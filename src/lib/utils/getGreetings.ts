import { DayTime } from "@/types/greeting";

export function getGreeting(): DayTime {
  const hour = new Date().getHours();

  if (hour < 12) {
    return `morning`;
  } else if (hour < 18) {
    return "afternoon";
  } else {
    return "evening";
  }
}
