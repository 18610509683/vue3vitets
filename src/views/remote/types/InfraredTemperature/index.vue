<template>
  <div class="page full_wh flex">
    <div class="model-left h100">
      红外测温 {{ publicData }}
    </div>
    <div class="model-right h100">
        <div class="fixed_box">  
        <slot name="right"></slot>
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

<style lang="less" scoped>
@import "@/assets/css/variable.less";


</style>