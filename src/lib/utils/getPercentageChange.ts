export function getPercentageChange(value: number, target: number): number {
  if (target === 0) return 0; // avoid division by zero
  return (value / target) * 100;
}
