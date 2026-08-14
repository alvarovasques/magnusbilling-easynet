import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';

// Dev: o browser vê /index.php na mesma origem (localhost:5173); o proxy manda
// pro backend mantendo o path e o cert interno. Mesma forma que em produção
// (Traefik roteia /index.php -> backend), então dev e prod ficam idênticos.
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  server: {
    port: 5173,
    proxy: {
      '/index.php': {
        target: process.env.VITE_BACKEND ?? 'https://mb.di4e.com.br',
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: '',
        cookiePathRewrite: '/',
      },
    },
  },
});
