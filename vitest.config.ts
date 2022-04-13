import { defineConfig } from 'vitest/config'
import esbuild from 'rollup-plugin-esbuild'

export default defineConfig({
  plugins: [
    esbuild({ target: 'node14' }),
    {
      name: 'FetchPloyfill',
      transform(code, id) {
        if (!id.endsWith('src/request.ts')) return
        return `import './node-shim'; ${code}`
      },
    },
  ],
})
