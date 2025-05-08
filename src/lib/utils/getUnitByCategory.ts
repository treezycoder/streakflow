import { Categories } from "@/types/states";

export function getUnitByCategory(category: Categories): string {
  switch (category) {
    case "mind":
    case "recovery":
    case "activity":
      return "hours";
    case "hydration":
      return "litres";
    case "nutrition":
      return "meals";
    case "hygiene":
      return "times";
    default:
      return ""; // fallback
  }
}

export function getUnitMessage(category: Categories): string {
  const unit = getUnitByCategory(category);
  return `How many ${unit} so far?`;
}
