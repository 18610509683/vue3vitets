<script setup lang="ts">

import {Edit} from "@element-plus/icons-vue";
</script>

<template>
  <div>
    <el-button>Default</el-button>
    <el-button disabled>Default</el-button>
    <el-button :icon="Edit" />
    <el-button  loading />
  </div>
  <div>
    <el-button type="primary">Primary</el-button>
    <el-button type="primary" disabled>Default</el-button>
    <el-button type="primary" :icon="Edit" disabled/>
    <el-button type="primary" loading />
  </div>
</template>

<style scoped lang="scss">

</style>