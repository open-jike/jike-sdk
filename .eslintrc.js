/* eslint-disable @typescript-eslint/no-var-requires */
const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  extends: ['@sxzz/eslint-config-ts', '@sxzz/eslint-config-prettier'],
})
