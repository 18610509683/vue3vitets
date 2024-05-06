<template>
  <el-popover
      placement="top-start"
      title=""
      :width="200"
      trigger="hover"
      content="this is content, this is content, this is content"
  >
    <template #reference>
      <el-button class="m-2">Hover to activate</el-button>
    </template>
  </el-popover>

  <el-popover
      placement="bottom"
      title=""
      :width="200"
      trigger="click"
      content="this is content, this is content, this is content"
  >
    <template #reference>
      <el-button class="m-2">Click to activate</el-button>
    </template>
  </el-popover>

  <el-popover
      ref="popover"
      placement="right"
      title=""
      :width="200"
      trigger="focus"
      content="this is content, this is content, this is content"
  >
    <template #reference>
      <el-button class="m-2">Focus to activate</el-button>
    </template>
  </el-popover>

  <el-popover
      ref="popover"
      title=""
      :width="200"
      trigger="contextmenu"
      content="this is content, this is content, this is content"
  >
    <template #reference>
      <el-button class="m-2">contextmenu to activate</el-button>
    </template>
  </el-popover>

  <el-popover
      :visible="visible"
      placement="bottom"
      title=""
      :width="200"
      content="this is content, this is content, this is content"
  >
    <template #reference>
      <el-button class="m-2" @click="visible = !visible">
        Manual to activate
      </el-button>
    </template>
  </el-popover>

  <el-popover :visible="visible1" placement="top" :width="320">
    <div class="kkd_el_popover_confirm">
      <div class="kkd_el_popover_title">
        <el-icon><Warning /></el-icon>
        <span>确认要删除这条信息吗？</span>
      </div>
      <div class="kkd_el_popover_description">
        此操作不可恢复，您确定要进行删除操作吗？
      </div>
      <div  class="kkd_el_popover_button_group">
        <el-button class="kkd_el_popover_button_group_cancel"  @click="visible1 = false">取消</el-button>
        <el-button class="kkd_el_popover_button_group_confirm" @click="visible1 = false">
          确定
        </el-button>
      </div>
    </div>
    <template #reference>
      <el-button @click="visible1 = true">Delete</el-button>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {Warning} from "@element-plus/icons-vue";

const visible = ref(false)
const visible1 = ref(false)


</script>

<style scoped>
.el-button + .el-button {
  margin-left: 8px;
}
</style>
