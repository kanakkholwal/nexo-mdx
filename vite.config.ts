
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';
import { defineConfig } from "vite";
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css'
export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({

      insertTypesEntry: true,
      copyDtsFiles: true,
      tsconfigPath: './tsconfig.json',
    }),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@editor": path.resolve(__dirname, "./src/editor"),
      "@view": path.resolve(__dirname, "./src/view"),
    },
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'NexoMdx',
      formats: ['es']
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      }
    },
    minify: 'terser', // Use Terser for minification
  }
})
