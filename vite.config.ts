/// <reference types="vite/client" />
import react from "@vitejs/plugin-react-swc";
import { resolve } from 'node:path'
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { libInjectCss } from 'vite-plugin-lib-inject-css';



export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      insertTypesEntry: true,
      copyDtsFiles: true,
      tsconfigPath: './tsconfig.json',
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./lib"),
    },
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "./lib/index.ts"),
      name: "nexo-mdx",
      fileName: (format) => `index.${format}.js`,
      formats: ['es'],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    minify: 'terser', // Use Terser for minification
  }
})
