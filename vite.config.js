import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'ignore-large-glb',
      resolveId(id) {
        if (id.endsWith('.glb')) return id
      },
      load(id) {
        if (id.endsWith('.glb')) return 'export default ""'
      }
    },
    react(),
    tailwindcss()
  ],
  server: {
    allowedHosts: [
      'kind-guests-pay.loca.lt'
    ],
    watch: {
      ignored: ['**/*.glb']
    }
  },
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      external: [/\.glb$/]
    }
  }
})

