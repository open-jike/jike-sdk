let _crypto: any
import('node:crypto')
  .then((c) => (_crypto = c))

  .catch(() => null)

export function generateUUID(): string | undefined {
  try {
    const crypto: Crypto | undefined = (globalThis as any).crypto || _crypto
    if (!crypto) return undefined
    return crypto.randomUUID()
  } catch {}
  return undefined
}
