export const resolveAreaCode = (code: string | number) => {
  if (typeof code === 'string' && code.startsWith('+')) return code
  return `+${code}`
}
