export function generateUUID(): string | undefined {
  return crypto.randomUUID()
}
