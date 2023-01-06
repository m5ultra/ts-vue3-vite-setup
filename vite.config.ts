import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ViteSetupExtend from 'vite-plugin-vue-setup-extend'
import vueTsx from '@vitejs/plugin-vue-jsx'

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': pathSrc,
      '@store': path.resolve(__dirname, 'src/store'),
      '@styl': path.resolve(__dirname, 'assets/styl'),
    },
  },
  plugins: [
    vue(),
    ViteSetupExtend(),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          enabledCollections: ['ion'],
        }),
      ],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
    }),
    Components({
      resolvers: [
        // 自动注册图标组件
        IconsResolver({
          prefix: false,
          enabledCollections: ['ion'],
        }),
        ElementPlusResolver(),
      ],
      dts: path.resolve(pathSrc, 'components.d.ts'),
    }),
    vueTsx(),
    Icons({
      autoInstall: true,
      compiler: 'vue3',
    }),
  ],
  build: {
    sourcemap: true,
  },
  server: {
    port: 9000,
  },
})
