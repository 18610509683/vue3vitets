<template>
  <div class="page full_wh flex">
    <div class="model-left h100">
      连拍 {{ publicData }}
    </div>
    <div class="model-right h100">
      <div class="fixed_box" :style="{ top: tempTop + 'px', opacity: 1, height: `calc(90vh - ${tempTop}px)` }">
        <el-collapse>
          <el-collapse-item name="1">
            <template #title>测试1</template>
            <div>测试内容</div>
          </el-collapse-item>
          <el-collapse-item name="2">
            <template #title>测试1</template>
            <div>测试内容</div>
          </el-collapse-item>
          <el-collapse-item name="3">
            <template #title>测试1</template>
            <div>测试内容</div>
          </el-collapse-item>

        </el-collapse>
        <div class="model-btn-sty">
          <el-button class="el-btn-cancel" @click="cancelClick">取 消</el-button>
          <el-button type="primary" @click="confirmClick">保 存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted } from 'vue'
const { proxy } = getCurrentInstance();
const tempTop = ref(450)
const props = defineProps({
  publicData: {
    type: Object
  }
})
const cancelClick=()=>{

}
const confirmClick=()=>{
  
}
onMounted(() => {
  proxy.$bus.on('updateTop', (data) => {
    tempTop.value = data;
  })
})
</script>

<style lang="scss" scoped>
.page {
  left: 0;
  top: 0;
  position: absolute;
  z-index: 1;
  pointer-events: none;

  .model-left {
    flex: 1;
    padding: 0 1.04vw 0.93vh 0.52vw;
    pointer-events: all;
  }

  .model-right {
    width: 20.62vw;
    padding-left: 0.52vw;
    position: relative;

    .fixed_box {
      width: 20.62vw;
      overflow: scroll;
      right: .6vw;
      position: fixed;
      pointer-events: all;
      z-index: 1;
    }
  }
}
</style>