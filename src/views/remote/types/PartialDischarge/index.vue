<template>
  <div class="page pd-page full_wh flex">
    <div class="model-left h100 flex flex-direction">
      <slot name="left"></slot>
      <div class="flex-1 w100 pd-container">
        <div
          v-if="myLoading"
          class="loading-text w100 h100 font-24 flex justify-center align-center"
          :style="{
            backdropFilter: `blur(${myLoading ? 3 : 0}px)`,
          }"
        >
          正在采样...
        </div>
        <div class="flex my-legend justify-center align-center">
          <div :class="['my-legend-label normal']">正常</div>
          <div>超声检测</div>
          <div class="font-20 text-active bold">32.32dB</div>
        </div>
        <Echart :option="option"></Echart>
      </div>
    </div>
    <div class="model-right h100 flex flex-direction">
      <slot name="swd"></slot>
      <div class="model-form h100 flex-1">
        <slot name="right"></slot>
        <el-collapse>
          <el-collapse-item name="放电监测">
            <template #title>放电监测</template>
            <DataTemplate></DataTemplate>
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
import Echart from "@/components/Echart.vue";
import { partailDischargeChart } from "../../js/echartsHandle";
import DataTemplate from "@/components/DataTemplate.vue";
const { proxy } = getCurrentInstance();
const props = defineProps({
  publicData: {
    type: Object,
  },
});

let myLoading = ref(true);
let option = ref(null);
const cancelClick = () => {};
const confirmClick = () => {};
onMounted(() => {
  option.value = partailDischargeChart();
  setTimeout(() => {
    myLoading.value = false;
  }, 2000);
});
</script>

<style lang="scss" scoped>
@import "../../../../assets/css/typeBaseStyle.scss";
</style>
