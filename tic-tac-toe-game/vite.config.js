import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "5173-godinhoweve-tictactoega-71jng15ln7j.ws-eu118.gitpod.io", 
    ],
  },
})
