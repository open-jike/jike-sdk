import { resolve } from 'path'
import { defineConfig } from 'tsup'
import type { Options } from 'tsup'

const $r = resolve.bind(undefined, __dirname)

const common: Options = {
  target: 'es2019',
  entry: [$r('src/index.ts')],
  sourcemap: true,
  dts: true,
}

export default defineConfig(() => {
  if (process.env.MODE === 'modern') return modern()
  else return node()
})

const modern = (): Options => {
  return {
    ...common,
    format: ['esm'],
    splitting: false,
    define: {
      IS_NODE: 'false',
    },
    minifySyntax: true,
    esbuildOptions: (options) => {
      options.outExtension = {}
    },
  }
}

const node = (): Options => ({
  ...common,
  format: ['esm'],
  clean: true,
  define: {
    IS_NODE: 'true',
  },
  minifySyntax: true,
  inject: [$r('src/node-shim.ts')],
  esbuildOptions: (options) => {
    options.entryNames = '[dir]/node'
  },
})
