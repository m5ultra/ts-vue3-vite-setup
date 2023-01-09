import { defineStore } from 'pinia'
import http from '@/utils/http'
import { reactive, toRefs } from 'vue'

interface Infos {
  [index: string]: unknown
}

export interface ChecksState {
  applyList: Infos[]
  checkList: Infos[]
}
export const useCheck = defineStore('check', () => {
  const data: ChecksState = reactive({
    applyList: [],
    checkList: [],
  })

  const updateApplyList = (payload) => {
    data.applyList = payload
  }
  const updateCheckList = (payload) => {
    data.checkList = payload
  }
  const getApply = (payload) => http.get('/checks/apply', payload)
  const postApply = (payload) => http.post('/checks/apply', payload)
  const putApply = (payload) => http.put('/checks/apply', payload)
  return {
    ...toRefs(data),
    getApply,
    postApply,
    putApply,
    updateCheckList,
    updateApplyList,
  }
})
