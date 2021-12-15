import { readFile } from 'fs/promises'
import { defineConfig } from 'tsup'
import type { Plugin } from 'esbuild'
import type { Options } from 'tsup'

const common: Options = {
  target: 'es2019',
  entry: ['src/index.ts'],
  sourcemap: true,
  dts: true,
}

export default defineConfig(() => {
  if (process.env.MODE === 'modern') return modern()
  else return node()
})

const modern = (): Options => {
  const RemoveFetch: Plugin = {
    name: 'remove-fetch',
    setup(build) {
      build.onLoad(
        { filter: /\/src\/common\.ts$/, namespace: 'file' },
        async ({ path }) => {
          let contents = await readFile(path, 'utf-8')
          contents = contents.replace("'./fetch-node'", "'./fetch-modern'")
          return {
            contents,
            loader: 'ts',
          }
        }
      )
    },
  }
  return {
    ...common,
    format: ['esm'],
    splitting: false,
    esbuildPlugins: [RemoveFetch],
    esbuildOptions: (options) => {
      options.outExtension = {}
    },
  }
}

const node = (): Options => ({
  ...common,
  format: ['esm'],
  clean: true,
  esbuildOptions: (options) => {
    options.entryNames = '[dir]/node'
  },
})
