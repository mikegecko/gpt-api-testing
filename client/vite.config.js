import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy: {
      '/api':{
        target: 'http://localhost:8080', //Change to URL of API
        changeOrigin: true,
        secure: false,
      }
    }
  }
})