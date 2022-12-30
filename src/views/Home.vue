<template>
  <h2>This is Home Page</h2>
  <h3>{{ s.count }}</h3>
  <button @click="handleClick">Click me!</button>
</template>

<script setup lang="ts">
import { useRoot } from '@store'

const s = useRoot()

const handleClick = () => s.increment()
</script>
