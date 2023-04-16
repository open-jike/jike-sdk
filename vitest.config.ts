import path from 'node:path'
import { defineConfig } from 'vitest/config'
import inject from '@rollup/plugin-inject'

const shim = path.resolve(__dirname, 'src/node-shim.ts')

export default defineConfig({
  plugins: [
    inject({
      globalThis: [shim, 'globalThis'],
    }),
  ],
})
