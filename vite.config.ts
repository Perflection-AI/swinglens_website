import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    // Base path configuration:
    // - For custom domain (perflection.ai): use '/' (default)
    // - For GitHub Pages subdirectory: use '/swinglens_website/'
    // You can override with VITE_BASE_PATH environment variable
    // Example: VITE_BASE_PATH=/swinglens_website/ npm run build
    const base = env.VITE_BASE_PATH || '/';
    
    return {
      base: base,
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
