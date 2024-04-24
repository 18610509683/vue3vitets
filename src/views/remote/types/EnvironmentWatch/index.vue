<template>
  <div class="page full_wh flex">
    <div class="model-left h100">
      <slot name="left"></slot>
      <div class="left-container">
        <div class="content">
          <div>序号</div>
          <div>传感器</div>
          <div>实时监控</div>
          <div>&nbsp;&nbsp;</div>
        </div>
        <div class="content light-content">
          <div>①</div>
          <div>温度</div>
          <div><span class="bt">正常</span></div>
          <div>33.32°C</div>
        </div>
      </div>
    </div>
    <div class="model-right h100 flex flex-direction">
      <slot name="swd"></slot>
      <div class="model-form h100 flex-1">
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
      </div>
      <div class="model-btn-sty flex justify-end">
        <el-button class="el-btn-cancel" @click="cancelClick">取 消</el-button>
        <el-button type="primary" @click="confirmClick">保 存</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted } from "vue";
const { proxy } = getCurrentInstance();
const tempTop = ref(450);
const props = defineProps({
  publicData: {
    type: Object,
  },
});
const cancelClick = () => {};
const confirmClick = () => {};
onMounted(() => {
  proxy.$bus.on("updateTop", (data) => {
    tempTop.value = data;
  });
});
</script>

<style lang="scss" scoped>
@import "../../../../assets/css/typeBaseStyle.scss";

.page {
  .model-left {
    .left-container {
      width: 37.4074vh;
      border: 1px solid pink;
      .content {
        padding: 0 1.0417vw;
        background-color: rgba(11, 76, 87, 1);
        display: flex;
        align-items: center;
        width: 100%;
        height: 4.4444vh;
        margin-bottom: 1.1111vh;

        div {
          flex: 1;
        }
        .bt {
          padding: 0.1852vh 0.4604vw;
          border: 1px solid rgba(0, 255, 243, 1);
        }
      }

      .light-content {
        background-color: rgb(12, 68, 81);
      }
      :hover {
        background-color: white;
      }
    }
  }
  .bt {
    padding: 0.1852vh 0.4604vw;
    border: 1px solid rgba(0, 255, 243, 1);
  }
}
.model-form {
  .light-content {
    background-color: rgb(12, 68, 81);
  }
}
</style>
