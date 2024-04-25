<template>
  <div class="w100 h100 p10-vw">
    <div class="full_wh" style="position: relative">
      <LightCornerBox
        width="15px"
        border-width="1px"
        class="lightCorner-Box flex-1 p10-vw"
      >
        <component
          :is="
            actionTypeEnums.find((item) => item.value == formData.ActionType)
              ?.component ?? VisibleLightCapture
          "
        >
          <!-- 左侧头部公共部分 -->
          <template #left>
            <div
              class="model-left-header w100 flex align-center justify-between"
            >
              <div class="content-title font-16-vw">采集巡检点</div>
              <div class="icon-group">
                <el-tooltip effect="dark" content="返回远程遥控" placement="top"
                  ><i
                    class="iconfont iconfont-a-fanhuishangyibu-01 font-22-vw"
                  ></i>
                </el-tooltip>
                <el-tooltip
                  v-if="auxboxStatus"
                  effect="dark"
                  content="关闭辅助框"
                  placement="top"
                  ><i
                    class="iconfont iconfont-auxbox-off font-18-vw"
                    @click="auxboxSwitch(false)"
                  ></i
                ></el-tooltip>
                <el-tooltip
                  v-else
                  effect="dark"
                  content="开启辅助框"
                  placement="top"
                  ><i
                    class="iconfont iconfont-auxbox-on font-18-vw"
                    @click="auxboxSwitch(true)"
                  ></i
                ></el-tooltip>
                <el-tooltip effect="dark" content="全屏" placement="top"
                  ><i class="iconfont iconfont-fullscreen font-18-vw"></i
                ></el-tooltip>
              </div>
            </div>
          </template>
          <template #swd>
            <div class="drawer-header flex align-center">
              <div class="flex-1 h100">
                <MySiteWithDevice
                  :is-adaption="true"
                  :adaption-dom="'.model-right'"
                ></MySiteWithDevice>
              </div>
              <i class="iconfont iconfont-close font-14"></i>
            </div>
          </template>
          <!-- 右侧头部公共部分 -->
          <template #right>
            <AddPatrolPointDialog
              desc="右侧共用部分"
              :form-data="formData"
              @updateForm="updateForm"
            />
          </template>
        </component>
      </LightCornerBox>
    </div>
  </div>
</template>

<script setup>
import {
  defineProps,
  getCurrentInstance,
  ref,
  onMounted,
} from "@vue/runtime-core";
import MySiteWithDevice from "./model-right/MySiteWithDevice.vue";
import AddPatrolPointDialog from "./model-right/addPatrolPointDialog.vue";
import VisibleLightCapture from "./types/VisibleLightCapture/index";
import InfraredTemperature from "./types/InfraredTemperature/index";
import ContinuousShot from "./types/ContinuousShot/index";
import EnvironmentWatch from "./types/EnvironmentWatch/index";
import MeterIdentify from "./types/MeterIdentify/index";
import PartialDischarge from "./types/PartialDischarge/index";
import KeepWatch from "./types/KeepWatch/index";
import { useRoute } from "vue-router";
const route = useRoute();
let formData = ref({});
formData.value = route.query.editType ? route.query : { editType: "1" };

/* --------采点类型相关 start---------- */
const actionTypeEnums = ref([
  {
    name: "可见光抓拍",
    value: "zhuapai",
    component: VisibleLightCapture,
  },
  {
    name: "红外测温",
    value: "hongwai",
    component: InfraredTemperature,
  },
  {
    name: "环境监测",
    value: "huanjing",
    component: EnvironmentWatch,
  },
  {
    name: "表计识别",
    value: "biaoji",
    component: MeterIdentify,
  },
  {
    name: "连拍",
    value: "lianpai",
    component: ContinuousShot,
  },
  {
    name: "局部放电检测",
    value: "fangdian",
    component: PartialDischarge,
  },
  {
    name: "守望",
    value: "shouwang",
    component: KeepWatch,
  },
]);
/* --------采点类型相关 end---------- */
console.log(defineProps);
const updateForm = (data) => {
  formData.value = data;
};
</script>

<style lang="less" scoped>
.drawer-header {
  width: 100%;
  height: 4.63vh;
  min-height: 34px;
  background: url(../../assets/img/table_header.png);
  margin-bottom: 0 !important;
  cursor: pointer;
  i {
    margin: 0 0.5208vw;
  }
}
.icon-group {
  margin-top: 1vh;

  .iconfont {
    margin-left: 0.94vw;
  }
}
</style>
./types/PartialDischarge/index
