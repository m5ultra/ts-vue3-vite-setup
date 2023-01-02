import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ViteSetupExtend from 'vite-plugin-vue-setup-extend'
import vueTsx from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@styl': path.resolve(__dirname, 'assets/styl'),
    },
  },
  plugins: [
    vue(),
    ViteSetupExtend(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    vueTsx(),
  ],
  server: {
    port: 9000,
  },
})
