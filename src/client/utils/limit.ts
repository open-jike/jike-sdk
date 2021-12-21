export interface LimitOptionAll {
  total: number
  createdAt: Date
  updatedAt: Date
  currentPage: number
}
export type LimitOption<T extends keyof LimitOptionAll> = Pick<
  LimitOptionAll,
  T
>

export type LimitFn<T extends keyof LimitOptionAll = keyof LimitOptionAll> = (
  opt: LimitOption<T>
) => boolean

export const limitMaxCount =
  (target: number): LimitFn<'total'> =>
  ({ total }) =>
    total <= target

export const limitAfterTime =
  <T extends 'createdAt' | 'updatedAt'>(type: T, target: Date): LimitFn<T> =>
  (opt) => {
    const option = opt as LimitOption<'createdAt' | 'updatedAt'>
    return new Date(option[type]).getTime() >= target.getTime()
  }

export const limitBeforeTime =
  <T extends 'createdAt' | 'updatedAt'>(type: T, target: Date): LimitFn<T> =>
  (opt) => {
    const option = opt as LimitOption<'createdAt' | 'updatedAt'>
    return new Date(option[type]).getTime() < target.getTime()
  }

export const limitPage =
  (condition: (currentPage: number) => boolean): LimitFn<'currentPage'> =>
  ({ currentPage }) =>
    condition(currentPage)

export const limitNone: LimitFn<never> = () => true
