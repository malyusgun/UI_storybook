import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import { resolve, dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'FeatherUI',
      fileName: 'featherui',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
    // outDir: path.join(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@icons': fileURLToPath(new URL('./src/icons', import.meta.url)),
      '@helpers': fileURLToPath(new URL('./src/common/helpers', import.meta.url)),
      '@interfaces': fileURLToPath(new URL('./src/common/interfaces', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
    },
  },
});
