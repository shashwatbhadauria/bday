import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/bday/",
  build: {
    outDir: 'dist',
    assetsInclude: ['**/*.mp3', '**/*.mp4', '**/*.jpg', '**/*.jpeg', '**/*.png']
  }
})