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
    children: [
      {
        path: 'apply',
        name: 'apply',
        component: async () => import('@/views/Apply.vue'),
      },
      {
        path: 'check',
        name: 'check',
        component: async () => import('@/views/Check.vue'),
      },
      {
        path: 'exception',
        name: 'exception',
        component: async () => import('@/views/Exception.vue'),
      },
      {
        path: 'sign',
        name: 'sign',
        component: async () => import('@/views/Sign'),
      },
    ],
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
