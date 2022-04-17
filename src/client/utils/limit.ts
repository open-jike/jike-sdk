export interface LimitOptionAll {
  total: number
  createdAt: Date
  updatedAt: Date
  currentPage: number
  followTime: Date
}
export type LimitOption<K extends keyof LimitOptionAll> = Pick<
  LimitOptionAll,
  K
>

export type LimitFn<
  K extends keyof LimitOptionAll = keyof LimitOptionAll,
  T = any
> = (opt: LimitOption<K>, item: T, data: T[]) => boolean

export const limitMaxCount =
  (target: number): LimitFn<'total'> =>
  ({ total }) =>
    total <= target

export const limitAfterTime =
  <T extends 'createdAt' | 'updatedAt' | 'followTime'>(
    type: T,
    target: Date
  ): LimitFn<T> =>
  (opt) => {
    const option = opt as LimitOption<'createdAt' | 'updatedAt' | 'followTime'>
    return new Date(option[type]).getTime() >= target.getTime()
  }

export const limitBeforeTime =
  <T extends 'createdAt' | 'updatedAt' | 'followTime'>(
    type: T,
    target: Date
  ): LimitFn<T> =>
  (opt) => {
    const option = opt as LimitOption<'createdAt' | 'updatedAt' | 'followTime'>
    return new Date(option[type]).getTime() < target.getTime()
  }

export const limitPage =
  (condition: (currentPage: number) => boolean): LimitFn<'currentPage'> =>
  ({ currentPage }) =>
    condition(currentPage)

export const limitNone = (): LimitFn<never> => () => true
