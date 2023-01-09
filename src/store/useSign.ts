import { defineStore } from 'pinia'
import http from '@/utils/http'
import { reactive, toRefs } from 'vue'

export const useSign = defineStore(
  'sign',
  () => {
    const data = reactive({
      infos: {},
    })
    const putTime = (_, payload) => http.put('/signs/time', payload)
    const updateInfos = (payload) => {
      data.infos = payload
    }
    const getTime = (payload) => http.get('/signs/time', payload)
    const getInfos = (payload) => http.get('/signs/time', payload)

    return {
      ...toRefs(data),
      putTime,
      updateInfos,
      getInfos,
      getTime,
    }
  },
  {
    persist: [
      {
        key: 'sign',
        storage: sessionStorage,
        // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
        paths: ['infos'],
      },
    ],
  }
)
