import { defineConfig } from 'vitest/config'
import esbuild from 'rollup-plugin-esbuild'
import compareVersions from 'compare-versions'
import type { Plugin } from 'rollup'

const FetchPolyfill: Plugin = {
  name: 'FetchPloyfill',
  transform(code, id) {
    if (!id.endsWith('src/request.ts')) return
    return `import './node-shim'; ${code}`
  },
}

const plugins: Plugin[] = [esbuild({ target: 'node14' })]

// Enable ployfill when node < 18
if (compareVersions.compare(process.version, '18', '<'))
  plugins.push(FetchPolyfill)

export default defineConfig({
  plugins,
})
