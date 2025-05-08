export function generateHabitId(habitName: string): string {
  const cleanName = habitName.trim().toLowerCase().replace(/\s+/g, "-");
  const timestamp = Date.now().toString(36); // base36 for compactness
  const randomStr = Math.random().toString(36).substring(2, 6); // 4-char random string

  return `${cleanName}-${timestamp}-${randomStr}`;
}
