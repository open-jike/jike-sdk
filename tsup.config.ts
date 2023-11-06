import { defineConfig } from 'tsup'

const common = defineConfig({
  entry: ['src/index.ts'],
  sourcemap: true,
  minifySyntax: true,
  clean: true,
  platform: 'neutral',
  target: 'es2022',
  splitting: false,
})

export default defineConfig([
  { ...common, format: 'esm' },
  { ...common, format: 'cjs', noExternal: ['ky'] },
])
