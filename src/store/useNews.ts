import { defineStore } from 'pinia'
import http from '@/utils/http'
import { reactive, toRefs } from 'vue'

interface Info {
  [index: string]: unknown
}

export interface NewsState {
  info: Info
}

export const useNews = defineStore('news', () => {
  const state: NewsState = reactive({ info: {} })
  const updateInfo = (state, payload) => {
    state.info = payload
  }

  const getRemind = (payload) => http.get('news/remind', payload)
  const putRemind = (payload) => http.put('news/remind', payload)

  return {
    ...toRefs(state),
    getRemind,
    putRemind,
    updateInfo,
  }
})
