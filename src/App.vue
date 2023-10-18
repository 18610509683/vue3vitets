<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { tv_device_list } from '@/api'
tv_device_list().then()
</script>

<template>
  <el-button type="primary">测试</el-button>
  <HelloWorld msg="" />
</template>
<style lang="scss">
div {
  border-radius: 50%;
  transition: all;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
