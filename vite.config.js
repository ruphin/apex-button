import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5000,
  },
  preview: {
    port: 5000,
  },
  build: {
    lib: {
      entry: 'button.js',
      formats: ['es'],
      fileName: () => 'button.js',
    },
    rollupOptions: {
      // Keep dependencies as bare imports so consumers dedupe them.
      external: [/^lit-html(\/.*)?$/, /^@apex-elements\/fonts(\/.*)?$/],
    },
  },
  test: {
    passWithNoTests: true,
  },
});
