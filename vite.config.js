import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/analytics/', // Ensure this matches the repository name if deploying to GitHub Pages
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
})
