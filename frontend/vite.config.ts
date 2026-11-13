import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Simple, beginner-friendly Vite config. No extra plugins needed.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
});
