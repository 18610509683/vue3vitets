<script setup lang="ts">
const value1 = ref(11)
</script>

<template>
  <el-slider v-model="value1" />
  <el-slider v-model="value1" disabled/>
</template>

<style scoped lang="scss">

</style>