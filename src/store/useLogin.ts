import { defineStore } from 'pinia'
import { reactive, ref, toRefs } from 'vue'
import http from '@/utils/http'
import type { Result } from '@/utils/http'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Login {
  export interface IApprover {
    _id: string
    name: string
  }
  export interface IUser {
    name: string

    permission: 'home' | 'sign' | 'exception' | 'apply' | 'check'[]

    _id: string
    approver: IApprover[]

    head: string
  }
}
type IUsers = Result & { infos: Login.IUser }
export const useLogin = defineStore(
  'login',
  () => {
    const token = ref<string>('')
    const data = reactive({ infos: {} }) as IUsers
    const updateToken = (v) => {
      token.value = v
    }
    const getUserInfos = () =>
      http.get<{ infos: Login.IUser }>('/users/infos').then((res) => res)

    const updateInfos = (v) => {
      data.infos = v
    }

    const delToken = () => {
      token.value = ''
    }

    return {
      token,
      ...toRefs(data),
      updateToken,
      getUserInfos,
      updateInfos,
      delToken,
    }
  },
  {
    persist: [
      {
        key: 'login',
        storage: sessionStorage,
        // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
        paths: ['token', 'infos'],
      },
    ],
  }
)
