import { defineStore } from 'pinia'
import { useLogin } from '@/store/useLogin'
import { computed, ref } from 'vue'

// 01.options的写法
// export const useRoot = defineStore('num', {
//   state: () => ({
//     count: 1,
//   }),
//   getters: {
//     double(state) {
//       return state.count * 2
//     },
//   },
//   actions: {
//     increment() {
//       this.count++
//     },
//     incrementAsync() {
//       setTimeout(() => {
//         this.count++
//       }, 1000)
//     },
//   },
//   // persist: true, // 持久化所以数据
//   persist: [
//     {
//       key: 'vuex',
//       storage: sessionStorage,
//       // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
//       paths: ['count'],
//     },
//     {
//       key: 'vuex02',
//       paths: ['count'],
//       storage: localStorage,
//     },
//   ],
// })

// setup 写法
const useStore = defineStore(
  'num',
  () => {
    const count = ref(0)
    const double = computed(() => count.value * 3)
    const increment = () => {
      count.value++
    }
    return { count, increment, double }
  },
  {
    persist: [
      {
        key: 'vuex',
        storage: sessionStorage,
        // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
        paths: ['count'],
      },
      {
        key: 'vuex',
        paths: ['count'],
        storage: localStorage,
      },
    ],
  }
)

export { useStore, useLogin }
