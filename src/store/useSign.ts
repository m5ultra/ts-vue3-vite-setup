import { defineStore } from 'pinia'
import http from '@/utils/http'
import { reactive, toRefs } from 'vue'

export const useSign = defineStore('sign', () => {
  const infos = reactive({
    infos: {},
  })
  const putTime = (payload) => http.put('/signs/time', payload)
  const updateInfos = (state, payload) => {
    infos.infos = payload
  }
  return {
    ...toRefs(infos),
    putTime,
    updateInfos,
  }
})
