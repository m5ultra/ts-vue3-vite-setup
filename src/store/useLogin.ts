import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLogin = defineStore(
  'login',
  () => {
    const token = ref<string>('')
    const updateToken = (v) => {
      token.value = v
    }
    return {
      token,
      updateToken,
    }
  },
  {
    persist: [
      {
        key: 'login',
        storage: sessionStorage,
        // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
        paths: ['token'],
      },
    ],
  }
)
