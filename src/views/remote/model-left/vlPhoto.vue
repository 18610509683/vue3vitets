<template>
  <div class="h100 w100 flex flex-direction">
    <div class="model-left-header w100 flex align-center justify-between">
      <slot name="title"></slot>
      <div class="icon-group">
        <!-- <el-tooltip
          effect="dark"
          content="返回远程遥控"
          placement="top"
          ><i class="iconfont iconfont-a-fanhuishangyibu-01 font-22-vw"></i>
        </el-tooltip> -->
        <el-tooltip effect="dark" content="关闭辅助框" placement="top"
          ><i class="iconfont iconfont-auxbox-off font-18-vw"></i
        ></el-tooltip>
        <el-tooltip effect="dark" content="开启辅助框" placement="top"
          ><i class="iconfont iconfont-auxbox-on font-18-vw"></i
        ></el-tooltip>
        <el-tooltip effect="dark" content="全屏" placement="top"
          ><i class="iconfont iconfont-fullscreen font-18-vw"></i
        ></el-tooltip>
      </div>
    </div>
    <div
      class="model-left-content w100 flex-1"
      style="background-color: antiquewhite"
    ></div>
  </div>
</template>
<script setup></script>
<style lang="less" scoped>
.icon-group {
    margin-top: 1vh;
  .iconfont {
    margin-left: 0.94vw;
  }
}
</style>
