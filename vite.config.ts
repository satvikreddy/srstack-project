import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const config = defineConfig({
  esbuild: {
    pure:
      process.env.NODE_ENV === 'production'
        ? ['console.debug', 'console.log', 'console.info']
        : [],
  },
  plugins: [
    devtools({ consolePiping: {} }),
    nitro(),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
  resolve: {
    alias: [
      // this is needed due to https://github.com/TanStack/router/issues/5738
      { find: 'use-sync-external-store/shim/index.js', replacement: 'react' },
    ],
  },
})

export default config
