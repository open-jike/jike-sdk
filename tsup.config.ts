import { resolve } from 'path'
import { defineConfig } from 'tsup'
import type { Options } from 'tsup'

const $r = resolve.bind(undefined, __dirname)

const common: Options = {
  entry: [$r('src/index.ts')],
  sourcemap: true,
}

export default defineConfig(() => {
  if (process.env.MODE === 'modern') return modern()
  else return node()
})

const modern = (): Options => {
  return {
    ...common,
    platform: 'browser',
    target: 'es2019',
    format: ['esm'],
    splitting: false,
    define: {
      IS_NODE: 'false',
    },
    minifySyntax: true,
    esbuildOptions: (options) => {
      options.outExtension = {}
    },
    external: ['node-fetch', 'ky', 'eventemitter3'],
    clean: true,
  }
}

const node = (): Options => ({
  ...common,
  outDir: 'dist/node',
  target: 'node14.17',
  platform: 'node',
  format: ['cjs', 'esm'],
  define: {
    IS_NODE: 'true',
  },
  minifySyntax: true,
  inject: [$r('src/node-shim.ts')],
})
