<template>
  <div class="w100 h100 p10-vw">
    <div class="full_wh" style="position: relative;">
      <VisibleLightCapture decs="可见光抓拍" v-if="formData.ActionType == 'zhuapai'" :publicData="formData" />
      <InfraredTemperature desc="红外测温" v-if="formData.ActionType == 'hongwai'" :publicData="formData" />
      <ContinuousShot desc="连拍" v-if="formData.ActionType == 'lianpai'" :publicData="formData" />
      <EnvironmentWatch desc="环境监测" v-if="formData.ActionType == 'huanjing'" :publicData="formData" />
      <MeterIdentify desc="表计识别" v-if="formData.ActionType == 'biaoji'" :publicData="formData" />
      <PartialDischange desc="局放监测" v-if="formData.ActionType == 'fangdian'" :publicData="formData" />
      <KeepWatch desc="守望-越界告警" v-if="formData.ActionType == 'shouwang'" :publicData="formData"/>

      <LightCornerBox width="10px" border-width="1px" class="lightCorner-Box flex-1 p10-vw">
        <div class="addPoint-model flex align-center h100">
          <div class="model-left h100">
            <div class="model-left-header w100 flex align-center justify-between">
              <div class="content-title font-16-vw">采集巡检点</div>
              <div class="icon-group">
                <el-tooltip effect="dark" content="返回远程遥控" placement="top"><i
                    class="iconfont iconfont-a-fanhuishangyibu-01 font-22-vw"></i>
                </el-tooltip>
                <el-tooltip v-if="auxboxStatus" effect="dark" content="关闭辅助框" placement="top"><i
                    class="iconfont iconfont-auxbox-off font-18-vw" @click="auxboxSwitch(false)"></i></el-tooltip>
                <el-tooltip v-else effect="dark" content="开启辅助框" placement="top"><i
                    class="iconfont iconfont-auxbox-on font-18-vw" @click="auxboxSwitch(true)"></i></el-tooltip>
                <el-tooltip effect="dark" content="全屏" placement="top"><i
                    class="iconfont iconfont-fullscreen font-18-vw"></i></el-tooltip>
              </div>
            </div>
          </div>
          <div class="model-right h100" style="background-color: #043846;">
            <AddPatrolPointDialog desc="右侧共用部分" @updateForm="updateForm" />
          </div>

        </div>
      </LightCornerBox>

    </div>
  </div>
</template>

<script setup>
import { defineProps, getCurrentInstance } from '@vue/runtime-core';
import AddPatrolPointDialog from './model-right/addPatrolPointDialog.vue'
import VisibleLightCapture from './types/VisibleLightCapture/index'
import InfraredTemperature from './types/InfraredTemperature/index'
import ContinuousShot from './types/ContinuousShot/index'
import EnvironmentWatch from './types/EnvironmentWatch/index'
import MeterIdentify from './types/MeterIdentify/index'
import PartialDischange from './types/PartialDischange/index'
import KeepWatch from './types/KeepWatch/index'

const ActionType = ref('')
console.log(defineProps)
const formData = ref({})
const updateForm = (data) => {
  formData.value = data;
  console.log(data)
}
onMounted(() => {
  console.log(defineProps)

})
</script>

<style lang="less" scoped>
@import "@/assets/css/variable.less";

.addPoint-model {
  position: relative;

  .model-left {
    flex: 1;
    padding: 0 1.04vw 0.93vh 0.52vw;

    .model-left-header {
      height: 4.63vh;
    }

    .model-left-content {
      margin-top: 1.12vh;
    }
  }

  .model-right {
    width: 20.62vw;
    padding-left: 0.52vw;
    border-left: 1.5px solid @border--light-05;
  }
}

.icon-group {
  margin-top: 1vh;

  .iconfont {
    margin-left: 0.94vw;
  }
}
</style>