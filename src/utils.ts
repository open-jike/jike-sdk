export const generateUUID = (): string | undefined => {
  try {
    return globalThis?.crypto?.randomUUID?.()
    // eslint-disable-next-line no-empty
  } catch {}
  return undefined
}
