import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy: {
    '/':{
      target: 'http://localhost:5000', //Change to URL of API
      changeOrigin: true,
      secure: false,
    }
  }
})