import { createApp } from 'vue'
import routes from '@/routes'
import Root from './Root.vue'

createApp(Root).use(routes).mount('.Root')
