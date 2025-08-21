import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/bday/",
  assetsInclude: ['**/*.mp3', '**/*.mp4', '**/*.wav', '**/*.ogg'],
  build: {
    outDir: 'dist'
  }
})