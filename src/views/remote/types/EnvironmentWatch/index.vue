<template>
  <div class="page full_wh flex">
    <div class="model-left h100">
      <slot name="left"></slot>
      <div style="display: flex; padding: 110px 0">
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
        <div
          class="middle-container"
          style="
            border: 1px solid red;
            height: 200px;
            background-image: linear-gradient(
                to right,
                rgb(120, 133, 147)1px,
                transparent 1px
              ),
              linear-gradient(to bottom, rgb(120, 133, 147) 1px, transparent 1px);
            background-size: 20px 20px;
          "
        >
          <div id="chart" style="width: 969.25px; height: 574.97px"></div>
        </div>
      </div>
    </div>
    <div class="model-right h100 flex flex-direction">
      <slot name="swd"></slot>
      <div class="model-form h100 flex-1">
        <slot name="right"></slot>
        <el-collapse v-model="activeNames">
          <el-collapse-item name="1">
            <template #title>环境监测</template>
            <div>
              <el-form
                :model="form"
                label-width="80px"
                label-position="left"
                style=""
                display:flex
              >
                <el-form-item label="数据模版">
                  <div class="w100 h100 flex align-center flex-sub mix-select">
                    <el-select
                      v-model="form.meterType"
                      style="width: 3.2vw"
                      suffix-icon=""
                      class="edit-type select-color"
                      popper-class="edit-type-popper"
                      @visible-change="handleSelectChange"
                    >
                      <el-option
                        v-for="item in meterTypeList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                    <!-- <div class="line"></div> -->
                    <el-select
                      class="select-type"
                      v-model="form.meterOptions"
                      placeholder="请选择表计类型"
                      @visible-change="handleSelectChange"
                      @click="drawer = true"
                    >
                      <el-option
                        v-for="item in meterOptionsList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </el-form-item>
                <el-form-item label="匹配数据">
                  <div class="w100 h100 flex align-center flex-sub mix-select">
                    <el-select
                      v-model="form.meterType"
                      placeholder=""
                      style="width: 7vw"
                      suffix-icon=""
                      class="edit-type select-color"
                      popper-class="edit-type-popper"
                      @visible-change="handleSelectChange"
                    >
                      <el-option
                        v-for="item in meterTypeList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                    <!-- <div class="line"></div> -->
                    <el-select
                      class="select-type"
                      v-model="selectName"
                      placeholder=""
                      @visible-change="handleSelectChange"
                    >
                      <el-option
                        v-for="item in meterOptionsList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </el-form-item>

                <div>
                  <el-form-item label="数据单位">
                    <div class="flex align-center w100 des">1111</div>
                  </el-form-item>
                  <el-form-item label="数据说明">
                    <div class="flex align-center w100 des">1111</div>
                  </el-form-item>
                  <el-form-item label="数据验证">
                    <el-switch
                      v-model="value5"
                      class="ml-2"
                      inline-prompt
                      style="
                        --el-switch-on-color: #07909e;
                        --el-switch-off-color: rgba(6, 73, 85, 1);
                      "
                      active-text="ON"
                      inactive-text="OFF"
                    />
                    <!-- <div class="flex align-center w100 des">1111</div> -->
                  </el-form-item>
                </div>
              </el-form>
            </div>
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
const activeNames = ref(["1"]);
let meterTypeList = ref([
  { name: "复合器件", value: 1 },
  { name: "手柄开关", value: 2 },
  { name: "数显表", value: 3 },
  { name: "液位表", value: 4 },
  { name: "指示灯组", value: 5 },
  { name: "指针表", value: 6 },
  { name: "转换开关", value: 7 },
]);
let meterOptionsList = ref([
  { name: "合闸电流指针表", value: 1 },
  { name: "千伏电压表", value: 2 },
  { name: "电压表", value: 3 },
  { name: "电流表", value: 4 },
]);
let form = ref({
  name: "",
  area: 888,
  meterType: 6,
  meterOptions: 3,
});
const value5 = ref(true);

const cancelClick = () => {};
const confirmClick = () => {};

onMounted(() => {
  proxy.$bus.on("updateTop", (data) => {
    tempTop.value = data;
  });
  initChart();
});
const initChart = () => {
  const chartDom = document.getElementById("chart");
  echarts.init(chartDom).setOption({
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ],
  });
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/css/typeBaseStyle.scss";

.page {
  .model-left {
    // display: flex;
    .left-container {
      width: 37.4074vh;
      border: 1px solid pink;
      .content {
        padding: 0 1.0417vw;
        background: rgba(0, 255, 243, 0.2);
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
      .light-content:hover {
        background: rgba(0, 255, 243, 0.2);
      }
    }
  }
  .bt {
    padding: 0.1852vh 0.4604vw;
    border: 1px solid rgba(0, 255, 243, 1);
  }
  .mix-select {
    border: 1px solid #029c9d;
    .line {
      height: 20px;
      width: 1px;
      background: linear-gradient(243deg, #002627 0%, white 51%, #002627 100%);
    }
  }

  .mix-select:hover {
    border: 1px solid rgba(0, 255, 243, 1);
  }
  .des {
    background-color: rgba(6, 73, 85, 1);
  }
}

:deep(.el-form) {
  padding-left: 0.52vw;
  .edit-type {
    .el-select__wrapper {
      box-shadow: none;
      position: relative;
      padding-right: 0;
      &::after {
        content: "";
        height: 60%;
        width: 1px;
        background-image: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0.8) 50%,
          rgba(255, 255, 255, 0) 100%
        );
        position: absolute;
        top: 0.7vh;
        right: 0;
      }
    }
  }
  .select-type {
    .el-select__wrapper {
      box-shadow: none !important;
    }
  }
  .select-color {
    .el-select__wrapper {
      .el-select__selected-item {
        span:first-child {
          color: rgba(0, 255, 243, 1) !important;
        }
      }
    }
  }
  .input {
    .el-input__wrapper {
      border: none !important;
    }
    :hover {
      border: none !important;
      box-shadow: none;
    }
  }
}
</style>
