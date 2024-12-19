import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { fileURLToPath } from 'url'
// import path from 'path'

// Simulate __dirname in ESM
// const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
