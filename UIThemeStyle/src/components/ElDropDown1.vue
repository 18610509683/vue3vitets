<template>
  <div class="flex flex-wrap items-center">
    <el-dropdown trigger="contextmenu">
      <el-button disabled>
        Dropdown List
        <el-icon class="el-icon--right">
          <arrow-down/>
        </el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item>Action 4</el-dropdown-item>
          <el-dropdown-item>Action 5</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

  </div>
</template>

<script lang="ts" setup>
import {ArrowDown} from '@element-plus/icons-vue'

</script>
<style scoped>

</style>
