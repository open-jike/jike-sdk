import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    {
      name: 'FetchPloyfill',
      transform(code, id) {
        if (!id.endsWith('src/request.ts')) return
        return `import './node-shim'; ${code}`
      },
    },
  ],
})
