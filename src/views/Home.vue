<template>
  <h2>This is Home Page</h2>
  <h3>{{ s.count }}</h3>
  <h3>{{ s.double }}</h3>
  <el-button type="primary" @click="handleClick">Click me!</el-button>
</template>

<script setup lang="ts">
import { useRoot } from '@store'

const s = useRoot()

const handleClick = () => s.increment()
</script>
