import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useLogin, useSign, useNews, useCheck } from '@store'
import * as _ from 'lodash'

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
    redirect: '/home/sign',
    meta: {
      menu: true,
      title: '考勤管理',
      icon: 'document-copy',
      auth: true,
    },
    children: [
      {
        path: 'sign',
        name: 'sign',
        component: async () => import('@/views/Sign.vue'),
        meta: {
          menu: true,
          title: '在线打卡签到',
          icon: 'calendar',
          auth: true,
        },
        async beforeEnter(to, from, next) {
          const usersInfos = useLogin().infos
          const signsInfos = useSign().infos

          if (_.isEmpty(signsInfos)) {
            const { errmsg, infos } = await useSign().getInfos({
              // @ts-ignore
              userid: usersInfos._id,
            })
            if (errmsg === 'ok') {
              useSign().updateInfos(infos)
              next()
            }
          } else {
            next()
          }
          if (_.isEmpty(useNews().info)) {
            const { errcode, info } = await useNews().getRemind({
              // @ts-ignore
              userid: usersInfos._id,
            })
            if (errcode === 0) {
              useNews().updateInfo(info)
            }
          }
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
        async beforeEnter(to, from, next) {
          const usersInfos = useLogin().infos
          const signsInfos = useSign().infos
          const checksApplyList = useCheck().applyList
          const newsInfo = useNews().info
          if (_.isEmpty(signsInfos)) {
            const { errcode, infos } = await useSign().getTime({
              // @ts-ignore
              userid: usersInfos._id,
            })
            if (errcode === 0) {
              useSign().updateInfos(infos)
            } else {
              return
            }
          }
          if (_.isEmpty(checksApplyList)) {
            const { errcode, rets } = await useCheck().getApply({
              // @ts-ignore
              applicantid: usersInfos._id,
            })
            if (errcode === 0) {
              useCheck().updateApplyList(rets)
            } else {
              return
            }
          }
          if (_.isEmpty(newsInfo)) {
            const { errcode, info } = await useNews().getRemind({
              // @ts-ignore
              userid: usersInfos._id,
            })
            if (errcode === 0) {
              useNews().updateInfo(info)
            } else {
              return
            }
          }
          next()
        },
      },
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
        async beforeEnter(to, from, next) {
          const usersInfos = useLogin().infos
          const checksApplyList = useCheck().applyList
          const newsInfo = useNews().info
          if (_.isEmpty(checksApplyList)) {
            const { errcode, rets } = await useCheck().getApply({
              // @ts-ignore
              applicantid: usersInfos._id,
            })
            if (errcode === 0) {
              useCheck().updateApplyList(rets)
            } else {
              return
            }
          }
          if (newsInfo.applicant) {
            const { errcode, info } = await useNews().putRemind({
              // @ts-ignore
              userid: usersInfos._id,
              applicant: false,
            })
            if (errcode === 0) {
              useNews().updateInfo(info)
            } else {
              return
            }
          }
          next()
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
        async beforeEnter(to, from, next) {
          const usersInfos = useLogin().infos
          const checksCheckList = useCheck().checkList
          const newsInfo = useNews().info
          if (_.isEmpty(checksCheckList)) {
            const { errcode, rets } = await useCheck().getApply({
              // @ts-ignore
              approverid: usersInfos._id,
            })
            if (errcode === 0) {
              useCheck().updateCheckList(rets)
            } else {
              return
            }
          }
          if (newsInfo.approver) {
            const { errcode, info } = await useNews().putRemind({
              // @ts-ignore
              userid: usersInfos._id,
              approver: false,
            })
            if (errcode === 0) {
              useNews().updateInfo(info)
            } else {
              return
            }
          }
          next()
        },
      },
    ],
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const { token, getUserInfos, updateInfos } = useLogin()
  if (to.meta.auth) {
    if (token) {
      const { infos, errcode } = await getUserInfos()
      // store data to pinia
      if (errcode === 0) {
        await updateInfos(infos)
        next()
      } else {
        next()
      }
    } else {
      next('/login')
    }
  } else if (token && to.path === '/login') {
    next('/')
  } else {
    next()
  }
})

export default router
