import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // Proxy API requests to backend
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'ui_kit': path.resolve(__dirname, '../../apps/ui-kit/src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
