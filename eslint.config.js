// @ts-check
import { sxzz } from '@sxzz/eslint-config'

export default sxzz().append([
  {
    ignores: ['playground/**', 'docs/**', 'tests/deno/**'],
  },
  {
    files: ['**.md/**'],
    rules: {
      'unicorn/prefer-top-level-await': 'off',
    },
  },
])
