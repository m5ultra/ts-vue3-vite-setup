import { defineStore } from 'pinia'

// options的写法
export const useRoot = defineStore('counter', {
  state: () => ({
    count: 1,
  }),
  getters: {
    double(state) {
      return state.count * 2
    },
  },
  actions: {
    increment() {
      this.count++
    },
    incrementAsync() {
      setTimeout(() => {
        this.count++
      }, 1000)
    },
  },
  // persist: true, // 持久化所以数据
  persist: {
    key: 'vuex',
    storage: window.sessionStorage,
    // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
    paths: ['count'],
  },
})
