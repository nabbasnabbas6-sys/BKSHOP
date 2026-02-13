import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/BKSHOP/admin/',
  plugins: [react()],
  server: {
    port: 5174,
    strictPort: false,
  },
})
