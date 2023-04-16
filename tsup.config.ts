import { resolve } from 'node:path'
import { defineConfig } from 'tsup'
import type { Options } from 'tsup'

const $r = resolve.bind(undefined, __dirname)

const common: Options = {
  entry: [$r('src/index.ts')],
  sourcemap: true,
  minifySyntax: true,
  splitting: false,
  clean: true,
}

export default defineConfig(() => {
  return [
    {
      ...common,
      platform: 'browser',
      target: 'es2019',
      format: ['esm'],
      splitting: false,
      esbuildOptions: (options) => {
        options.outExtension = {}
      },
      dts: true,
    },
    {
      ...common,
      outDir: 'dist/node',
      target: 'node16.14',
      platform: 'node',
      format: ['cjs', 'esm'],
      noExternal: ['ky'],
      inject: [$r('src/node-shim.ts')],
    },
  ]
})
