<template>
  <h2>This is Home Page</h2>
  <h3>{{ s.count }}</h3>
  <h3>{{ s.double }}</h3>
  <el-button type="primary" @click="handleClick">Click me!</el-button>
  <hr />
  <router-view />
</template>

<script setup lang="ts">
import { useLogin, useStore } from '@store'
import { onMounted } from 'vue'

onMounted(() => {
  console.log(useLogin().infos, '999')
})
const s = useStore()

const handleClick = () => s.increment()
</script>
