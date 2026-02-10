import { defineConfig } from 'vite';

export default defineConfig({
  base: '/portfolio-timothee-pirot/', // ⚠️ Change avec le nom de ton repo GitHub
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});