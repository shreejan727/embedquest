import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Simple, beginner-friendly Vite config. No extra plugins needed.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
  // Ship Web Workers as ES modules (matches `type: 'module'` worker
  // creation) so the C-interpreter worker is a separate LAZY chunk
  // instead of being inlined into the main bundle.
  worker: {
    format: 'es',
  },
  // In local dev, /api/* is proxied to the DEPLOYED MIAA function on
  // Vercel (that is where GEMINI_API_KEY lives — never locally).
  server: {
    proxy: {
      '/api': {
        target: 'https://embedquest-one.vercel.app',
        changeOrigin: true,
      },
    },
  },
});
