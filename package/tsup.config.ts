import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['index.ts', 'tailwind-classes.ts'], // Include tailwind exports
  outDir: 'dist',
  format: ['esm', 'cjs',],
  dts: true,
  clean: true,
  sourcemap: true,
  external: ['react'],
  esbuildOptions(options) {
    // Configure path aliases for esbuild
    options.alias = {
      '@': './'
    }
  }
})