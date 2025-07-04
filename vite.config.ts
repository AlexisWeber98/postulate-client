import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer({
    filename: "./dist/bundle-analyzer.html", // Ruta donde se generará el informe
    open: true, // Abrir el informe automáticamente en el navegador
  })],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    rollupOptions: {
      external: ['/_vercel/insights/script.js']
    }
  }
});