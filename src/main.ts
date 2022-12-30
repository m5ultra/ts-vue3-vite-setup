import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import routes from '@/routes'
import Root from './Root.vue'

createApp(Root)
  .use(createPinia().use(piniaPluginPersistedstate))
  .use(routes)
  .mount('.Root')
