<template>
    <div ref="echartsRef" class="w100 h100"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, watch, ref,defineEmits,onUnmounted} from "vue";
const props = defineProps(["option"]);
let myChart = null;
const echartsRef = ref();
const init = () => {
  var chartDom = echartsRef.value;
  myChart = echarts.init(chartDom);
  props.option?myChart.setOption(props.option):'';
};
const chartResize=()=>{
    myChart.resize()
}
watch(
  () => props.option,
  (val) => {
    //setOption的第二个选项设置true，使得重新设置时清空之前的组件
    myChart.setOption(val, true);
    myChart.resize();
  },
  {
    deep: true,
  }
);
onMounted(() => {
  init();
  window.addEventListener("resize",chartResize,false);
});
onUnmounted(() => {
  window.removeEventListener('resize',chartResize,false)
})
</script>

<style scoped>

</style>