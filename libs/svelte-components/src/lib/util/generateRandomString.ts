export function generateRandomString(prefix?: string) {
  return `${prefix}:${Math.random().toString(16)}`;
}
