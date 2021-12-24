import type { LimitFn, LimitOptionAll, LimitOption } from './limit'

export interface PaginatedOption<
  T,
  L extends keyof LimitOptionAll = keyof LimitOptionAll,
  K = unknown
> {
  limit?: LimitFn<L | 'total'>
  onNextPage?: (currentPage: number, key: K | undefined, data: T[]) => void
}

export type PaginatedFetcher<T, K> = (
  lastKey: K | undefined
) => Promise<[K | undefined, T[]]>

export const fetchPaginated = async <
  T,
  K,
  L extends keyof LimitOptionAll = never
>(
  fetcher: (lastKey: K | undefined) => Promise<[K | undefined, T[]]>,
  limitOptionGetter: (item: T, data: T[]) => LimitOption<L | 'total'>,
  option: PaginatedOption<T, L, K>
) => {
  let lastKey: K | undefined = undefined
  const data: T[] = []
  let isContinue = true
  let page = 1
  do {
    const result: [K | undefined, T[]] = await fetcher(lastKey)
    lastKey = result[0]

    const list = result[1]
    for (const item of list) {
      if (option.limit && !option.limit(limitOptionGetter(item, data))) {
        isContinue = false
        break
      }
      data.push(item)
    }

    option.onNextPage?.(page, lastKey, data)

    page++
  } while (isContinue && lastKey)

  return data
}
