import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // tsconfig에서 별칭을 설정했기 때문에 동일하게 설정 필요
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
