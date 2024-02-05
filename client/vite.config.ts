import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const DATA_URL = process.env.DATA_URL;

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: `${DATA_URL}`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
