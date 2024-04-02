<template>
  <div class="container w100 h100">
    <LightCornerBox
      box-border-width="0px"
      width="15px"
      border-width="1px"
      background-color="#0D3E4D"
      class="lightCorner-Box flex-1 p10-vw"
    >
      <div class="header w100 flex align-center justify-between">
        <span class="font-18">创建巡检任务</span>
        <i class="iconfont iconfont-close"></i>
      </div>
      <div class="content flex-1 flex hidden-xy">
        <div class="flex-1">
          <TaskCanvas></TaskCanvas>
        </div>
        <div class="h100" style="width: 20.2604vw; border-left: 1px solid #0b4e5b">
          <TaskForm></TaskForm>
        </div>
      </div>
    </LightCornerBox>
  </div>
</template>

<script setup>
import TaskCanvas from "./components/TaskCanvas.vue";
import TaskForm from "./components/TaskForm.vue";
</script>

<style lang="scss" scoped>
.container {
    padding: 1.3889vh 0.5208vw;
  .header {
    height: 4.444vh;
    background-image: url(../../assets/img/table_header.png);
    padding: 0 1.0417vw;
  }
  .content {
    padding-top: 1.3889vh;
  }
}
</style>
