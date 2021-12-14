import { defineConfig } from 'tsup'

export default defineConfig({
  target: 'es2019',
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  splitting: true,
  sourcemap: true,
  dts: true,
  clean: true,
})
