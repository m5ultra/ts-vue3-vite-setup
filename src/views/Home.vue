<template>
  <h2>This is Home Page</h2>
  <h3>{{ s.count }}</h3>
  <h3>{{ s.double }}</h3>
  <el-button type="primary" @click="handleClick">Click me!</el-button>
  <hr />
  <router-view />
</template>

<script setup lang="ts">
import { useStore } from '@store'

const s = useStore()

const handleClick = () => s.increment()
</script>
