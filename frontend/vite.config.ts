import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import svgr from "vite-plugin-svgr";
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ svgr(), react(), tsconfigPaths({root: __dirname})],
  resolve: {
    alias: {
      $fonts: resolve('./src/vendor/fonts'),
      $assets: resolve('./src/assets'),
    }
  },
  build: {
    assetsInlineLimit:0,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "./src/scss/variables" as *;
          @use "./src/scss/mixins";
        `,
      },

    }
  },

})
