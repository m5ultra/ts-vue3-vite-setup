import { onBeforeMount } from 'vue'

const Sign = {
  setup() {
    onBeforeMount(() => {
      console.log('mount')
    })
    return () => <h2>Sign</h2>
  },
}

// webstorm 误报错误
// @ts-ignore
export default Sign
