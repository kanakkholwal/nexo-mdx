import { defineConfig } from 'tsup';



export default defineConfig({
  entry: ['index.ts', 'tailwind-classes.ts','tailwind.css'], // Include tailwind exports
  outDir: 'dist',
  format: ['esm', 'cjs',],
  dts: true,
  clean: true,
  sourcemap: true,
  external: ['react'],
  injectStyle:true,
  esbuildOptions(options) {
    // Configure path aliases for esbuild
    options.alias = {
      '@': './'
    } 

  }
})