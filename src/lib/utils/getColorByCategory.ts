import { Categories } from "@/types/states";

export function getColorByCategory(category: Categories): string {
  switch (category) {
    case "mind":
      return "#8e44ad"; // purple
    case "nutrition":
      return "#27ae60"; // green
    case "hydration":
      return "#3498db"; // blue
    case "recovery":
      return "#f1c40f"; // yellow
    case "activity":
      return "#e67e22"; // orange
    case "hygiene":
      return "#e74c3c"; // red
    default:
      return "#95a5a6"; // gray
  }
}
