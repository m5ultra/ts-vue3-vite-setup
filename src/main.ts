import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import routes from '@/routes'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Root from './Root.vue'

const app = createApp(Root)
  .use(createPinia().use(piniaPluginPersistedstate))
  .use(routes)

// eslint-disable-next-line no-restricted-syntax
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('.Root')
