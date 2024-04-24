<script setup lang="ts">
import {Check, Close, Hide, View} from "@element-plus/icons-vue";

const value1 = ref(true)
const value2 = ref(false)
</script>

<template>
  <el-switch v-model="value1" />
  <el-switch v-model="value2" />

  <el-switch
      v-model="value1"
      inline-prompt
      active-text="是"
      inactive-text="否"
  />
  <el-switch
      v-model="value2"
      inline-prompt
      active-text="是"
      inactive-text="否"
  />

  <el-switch v-model="value2">
    <template #active-action>
      <span class="custom-active-action">T</span>
    </template>
    <template #inactive-action>
      <span class="custom-inactive-action">F</span>
    </template>
  </el-switch>
  <el-switch v-model="value1" loading />
</template>

<style scoped lang="scss">

</style>