import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const Login = async () => import('@/views/Login.vue')

declare module 'vue-router' {
  interface RouteMeta {
    menu: boolean
    title: string
    icon: string
    auth: boolean
  }
}
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
    meta: {
      menu: true,
      title: '考勤管理',
      icon: 'document-copy',
      auth: true,
    },
    children: [
      {
        path: 'apply',
        name: 'apply',
        component: async () => import('@/views/Apply.vue'),
        meta: {
          menu: true,
          title: '添加考勤审批',
          icon: 'document-add',
          auth: true,
        },
      },
      {
        path: 'check',
        name: 'check',
        component: async () => import('@/views/Check.vue'),
        meta: {
          menu: true,
          title: '我的考勤审批',
          icon: 'finished',
          auth: true,
        },
      },
      {
        path: 'exception',
        name: 'exception',
        component: async () => import('@/views/Exception.vue'),
        meta: {
          menu: true,
          title: '异常考勤查询',
          icon: 'warning',
          auth: true,
        },
      },
      {
        path: 'sign',
        name: 'sign',
        component: async () => import('@/views/Sign'),
        meta: {
          menu: true,
          title: '在线打卡签到',
          icon: 'calendar',
          auth: true,
        },
      },
    ],
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
