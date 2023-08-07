import { sxzz } from '@sxzz/eslint-config'

export default sxzz([
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
