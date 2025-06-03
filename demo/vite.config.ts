import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@nexo-mdx': path.resolve(__dirname, '../package/dist/'),
      // Add other aliases if needed
    }
  },
  optimizeDeps: {
    exclude: ['@nexo-mdx',"remark-plugins"] // Exclude your package from optimization
  },
  server: {
    watch: {
      usePolling: true
    }
  }
})