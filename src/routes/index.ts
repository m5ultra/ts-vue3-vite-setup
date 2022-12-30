import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const Login = async () => import('@/views/Login.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/home',
    name: 'home',
    component: async () => import('@/views/Home.vue'),
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
