import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/iot/',
  plugins: [react()],
  server: {
    proxy: {
      '/iot-api': 'http://localhost:3000'
    }
  }
})