import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'ui_kit',
      filename: 'remoteEntry.js',
      // Expose components, utilities, and hooks for Module Federation
      exposes: {
        // Atoms
        './Button': './src/atoms/Button',
        './Badge': './src/atoms/Badge',
        './Spinner': './src/atoms/Spinner',
        // Molecules
        './Card': './src/molecules/Card',
        // Utilities
        './utils': './src/utils',
        './cn': './src/utils/cn',
        './formatDate': './src/utils/formatDate',
        // Hooks
        './hooks': './src/hooks',
      },
      // Shared dependencies
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.3.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.3.0',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5173,
    strictPort: true,
  },
  preview: {
    port: 5173,
  },
});
