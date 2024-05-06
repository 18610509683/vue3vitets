<script setup lang="ts">
const checked = ref(false)
const onChange = (status: boolean) => {
  checked.value = status
}
</script>

<template>
  <div style="display:flex;">
    <el-tag type="primary">Tag 1</el-tag>
    <el-tag type="primary" closable>Tag 1</el-tag>
<!--    <el-tag type="success">Tag 2</el-tag>-->
<!--    <el-tag type="info">Tag 3</el-tag>-->
    <el-tag type="warning">Tag 4</el-tag>
    <el-tag type="warning" closable>Tag 4</el-tag>
    <el-tag type="danger">Tag 5</el-tag>
    <el-tag type="danger" closable>Tag 5</el-tag>
    <el-check-tag :checked="checked" @change="onChange">Toggle me</el-check-tag>
  </div>
</template>

<style scoped lang="scss">

</style>