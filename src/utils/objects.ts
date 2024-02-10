/**
 * Create a new subset object by giving keys
 *
 * @category Object
 * @fork {@link https://github.com/antfu/utils/blob/main/src/object.ts#L113}
 */
export function objectPick<O extends object, T extends keyof O>(
  obj: O,
  keys: T[],
  omitUndefined = false,
) {
  return keys.reduce(
    (n, k) => {
      if (k in obj && (!omitUndefined || obj[k] !== undefined)) n[k] = obj[k]
      return n
    },
    {} as Pick<O, T>,
  )
}
