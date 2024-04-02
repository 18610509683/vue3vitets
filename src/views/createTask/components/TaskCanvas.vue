<template>
  <div class="task-canvas w100 h100 flex flex-direction">
    <div class="filter-box flex justify-end align-center">
      <div class="flex align-center" v-for="item in filterOptions">
        <el-checkbox v-model="item.isCheck"></el-checkbox>
        <span>{{ item.name }}</span>
        <i
          :class="[
            'iconfont',
            item.isVisible ? 'iconfont-guanbiyulan' : 'iconfont-yulan',
          ]"
          @click="
            () => {
              item.isVisible = !item.isVisible;
            }
          "
        ></i>
      </div>
    </div>
    <div id="draw-box" class="draw-box flex-1">
      <canvas id="myCanvas"></canvas>
    </div>
    <div
      class="tab-box flex"
      :style="{
        '--left':
          (tabOptions.findIndex((item) => item.code == currentTab) ?? 0) *
            4.9479 +
          'vw',
      }"
    >
      <div
        :class="[
          'tab-box-item cursor-pointer h100 flex align-center justify-center',
          currentTab == item.code ? 'text-active' : 'text-off',
        ]"
        v-for="(item, index) in tabOptions"
        @click="
          () => {
            currentTab = item.code;
          }
        "
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted } from "vue";
import { TaskCanvas } from "../js/taskCanvas";
const filterOptions = ref([
  {
    name: "可见光拍摄",
    code: "kejianguangpaishe",
    isCheck: true,
    isVisible: true,
  },
  {
    name: "红外测温",
    code: "hongwaicewen",
    isCheck: true,
    isVisible: true,
  },
  {
    name: "可见光识别",
    code: "kejianguangshibie",
    isCheck: true,
    isVisible: true,
  },
  {
    name: "局部放电检测",
    code: "jubufangdian",
    isCheck: true,
    isVisible: true,
  },
  {
    name: "可见光连拍",
    code: "kejianguanglianpai",
    isCheck: true,
    isVisible: true,
  },
]);
const tabOptions = [
  {
    name: "地图单选",
    code: "clickSelect",
  },
  {
    name: "地图框选",
    code: "boxSelect",
  },
];
let currentTab = ref("clickSelect");
let taskCanvas=null
onMounted(()=>{
  taskCanvas=new TaskCanvas({
    id:'myCanvas',
    dom:document.getElementById("draw-box")
  })
})
</script>

<style lang="scss" scoped>
.task-canvas {
  .filter-box {
    height: 3.1481vh;
    padding-right: 1.5625vw;
    div {
      margin-left: 2.6042vw;
    }
    span {
      margin: 0 0.5208vw;
    }
  }
  .tab-box {
    height: 3.1481vh;
    position: relative;
    &-item {
      width: 4.9479vw;
    }
    &::after {
      content: "";
      position: absolute;
      width: 4.9479vw;
      background-color: #00fff3;
      height: 2px;
      bottom: 0;
      left: var(--left);
      transition: all 0.5s;
    }
  }
}
</style>
