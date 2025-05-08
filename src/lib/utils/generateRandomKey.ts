export function generateRandomKey({
  length = 16,
  includeSpecialChars = false,
  unique = false,
}: {
  length?: number;
  includeSpecialChars?: boolean;
  unique?: boolean;
} = {}): string {
  const baseChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const specialChars = "!@#$%^&*()-_=+[]{}|;:,.<>?";
  const chars = baseChars + (includeSpecialChars ? specialChars : "");

  let result = "";
  const charsLength = chars.length;

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charsLength));
  }

  // Add uniqueness if required
  if (unique) {
    const uniquePart = Date.now().toString(36); // base36 timestamp
    result += `-${uniquePart}`;
  }

  return result;
}
