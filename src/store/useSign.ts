import { defineStore } from 'pinia'
import http from '@/utils/http'
import { reactive, toRefs } from 'vue'

export const useSign = defineStore('sign', () => {
  const infos = reactive({
    infos: {},
  })
  const putTime = (_, payload) => http.put('/signs/time', payload)
  const updateInfos = (payload) => {
    infos.infos = payload
  }

  const getInfos = (payload) => http.get('/signs/time', payload)

  return {
    ...toRefs(infos),
    putTime,
    updateInfos,
    getInfos,
  }
})
