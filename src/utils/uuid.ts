export const generateUUID = (): string | undefined => {
  try {
    if ((globalThis as any).crypto?.randomUUID) {
      return globalThis.crypto.randomUUID()
    }
  } catch {}
  return undefined
}
