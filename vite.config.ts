
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';
import { defineConfig } from "vite";
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
    insertTypesEntry: true,
    copyDtsFiles: true,
    tsconfigPath: './tsconfig.json',
  }),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'NexoMdx',
      fileName: (format) => `nexo-mdx.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        exports: 'named'
      },
    },
    minify: 'terser', // Use Terser for minification
    sourcemap: true,  // Generate source maps for better debugging
  }
})
