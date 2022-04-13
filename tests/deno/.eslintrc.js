const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  rules: {
    'unicorn/import-index': 'off',
    'no-console': 'off',
  },
})
