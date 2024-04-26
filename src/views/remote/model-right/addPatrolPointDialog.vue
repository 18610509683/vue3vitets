<template>
  <el-collapse v-model="activeCollapse">
    <div class="body-form" id="publicBox">
      <!-- 点位信息 -->
      <el-collapse-item name="point-info">
        <template #title>点位信息</template>
        <div>
          <el-form :model="_formData" label-width="120px" label-position="left">
            <el-form-item label="巡检设备">
              <div class="check-state" v-if="!isEdit">
                <i
                  :class="
                    'iconfont iconfont-' +
                    actionTypeOption.find(
                      (i) => i.actionTypeValue == _formData.actionType
                    )?.actionTypeIcon
                  "
                ></i>
                <span>{{ _formData.equitname }}</span>
              </div>
              <el-select
                v-model="_formData.equitname"
                placeholder="请选择巡检设备"
                v-else
              >
                <el-option
                  v-for="item in actionTypeOption"
                  :key="item.actionTypeValue"
                  :label="item.actionTypeLabel"
                  :value="item.actionTypeValue"
                >
                  <span style="float: left">
                    <i
                      :class="'iconfont iconfont-' + item.actionTypeIcon + ''"
                      style="margin-right: 10px"
                    ></i>
                  </span>
                  <span style="float: left; color: #8492a6; font-size: 13px">{{
                    item.name
                  }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="点位名称">
              <div class="check-state" v-if="!isEdit">
                <i
                  :class="
                    'iconfont iconfont-' +
                    actionTypeOption.find(
                      (i) => i.actionTypeValue == _formData.actionType
                    )?.actionTypeIcon
                  "
                ></i>
                <span>{{ _formData.name }}</span>
              </div>
              <div
                class="w100 flex align-center flex-sub point-name"
                :class="{ 'is-focus': showDropDown }"
                v-else
              >
                <el-select
                  v-model="_formData.editType"
                  placeholder=""
                  style="width: 3.2vw"
                  suffix-icon=""
                  class="edit-type"
                  popper-class="edit-type-popper"
                  @visible-change="handleSelectChange"
                >
                  <el-option label="新增" value="1" />
                  <el-option label="更新" value="2" />
                </el-select>
                <el-select
                  v-if="_formData.editType == 2"
                  v-model="_formData.name"
                  placeholder="请选择巡检点"
                  @visible-change="handleSelectChange"
                >
                  <el-option label="正面点位" value="1" />
                  <el-option label="背面点位" value="2" />
                </el-select>
                <el-input
                  v-else
                  v-model="_formData.name"
                  placeholder="请输入巡检点名称"
                  maxlength="20"
                  show-word-limit
                  @focus="handleSelectChange"
                  @blur="handleSelectChange"
                >
                </el-input>
              </div>
            </el-form-item>
            <el-form-item label="所在场景" class="form-item-disabled">
              <div class="check-state is-disabled" v-if="!isEdit">
                <i
                  :class="
                    'iconfont iconfont-' +
                    actionTypeOption.find(
                      (i) => i.actionTypeValue == _formData.actionType
                    )?.actionTypeIcon
                  "
                ></i>
                <span>{{ _formData.env }}</span>
                <span class="clickable"> 查看 </span>
              </div>
              <el-select
                v-model="_formData.env"
                placeholder="请选择所在场景"
                disabled
                v-else
              >
                <el-option
                  v-for="item in actionTypeOption"
                  :key="item.actionTypeValue"
                  :label="item.actionTypeLabel"
                  :value="item.actionTypeValue"
                >
                  <span style="float: left">
                    <i
                      :class="'iconfont iconfont-' + item.icon + ''"
                      style="margin-right: 10px"
                    ></i>
                  </span>
                  <span style="float: left; color: #8492a6; font-size: 13px">{{
                    item.name
                  }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所在区域" class="form-item-disabled">
              <div class="check-state is-disabled" v-if="!isEdit">
                <i
                  :class="
                    'iconfont iconfont-' +
                    actionTypeOption.find(
                      (i) => i.actionTypeValue == _formData.actionType
                    )?.actionTypeIcon
                  "
                ></i>
                <span>{{ _formData.area }}</span>
                <span class="clickable"> 定位 </span>
              </div>
              <el-select
                v-model="_formData.area"
                placeholder="请选择所在区域"
                disabled
                v-else
              >
                <el-option
                  v-for="item in actionTypeOption"
                  :key="item.actionTypeValue"
                  :label="item.actionTypeLabel"
                  :value="item.actionTypeValue"
                >
                  <span style="float: left">
                    <i
                      :class="'iconfont iconfont-' + item.actionTypeIcon + ''"
                      style="margin-right: 10px"
                    ></i>
                  </span>
                  <span style="float: left; color: #8492a6; font-size: 13px">{{
                    item.name
                  }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="动作类型">
              <div class="check-state" v-if="!isEdit">
                <i
                  :class="
                    'iconfont iconfont-' +
                    actionTypeOption.find(
                      (i) => i.actionTypeValue == _formData.actionType
                    )?.actionTypeIcon
                  "
                ></i>
                <span>{{ _formData.actionType }}</span>
              </div>
              <el-select
                v-model="_formData.actionType"
                placeholder="请选择动作类型"
                @change="actionTypeChange"
                v-else
              >
                <template #prefix v-if="_formData.actionType">
                  <i
                    :class="
                      'iconfont iconfont-' +
                      actionTypeOption.find(
                        (i) => i.actionTypeValue == _formData.actionType
                      )?.actionTypeIcon
                    "
                    style="margin-right: 2px"
                  ></i>
                </template>
                <el-option
                  v-for="item in actionTypeOption"
                  :key="item.actionTypeValue"
                  :label="item.actionTypeLabel"
                  :value="item.actionTypeValue"
                >
                  <span style="float: left">
                    <i
                      :class="'iconfont iconfont-' + item.actionTypeIcon"
                      style="margin-right: 10px"
                    ></i>
                  </span>
                  <span style="float: left; color: #8492a6; font-size: 13px">{{
                    item.actionTypeLabel
                  }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
      <!-- 位姿参数 -->
      <el-collapse-item name="location-pose">
        <template #title>
          <div class="el-collapse-item__header_div">
            <span>位姿参数</span>
            <span
              v-if="canUsePresetPoint"
              :class="{ primary: activeLPType == 0 }"
              @click.stop="
                () => {
                  activeLPType = 0;
                }
              "
              >调用预置点</span
            >
            <span
              v-if="canUsePresetPoint"
              :class="{ primary: activeLPType == 1 }"
              @click.stop="
                () => {
                  activeLPType = 1;
                }
              "
              >平台采集</span
            >
          </div>
        </template>
        <div>
          <el-form
            :model="_formData"
            v-if="!canUsePresetPoint || activeLPType == 1"
            label-width="120px"
            label-position="left"
          >
            <!-- <template v-for="item in locationPoseArr" :key="item">
            <el-form-item label="行走位置" v-if="locationPoseObj?.xingzou">
              <div class="check-state" v-if="!isEdit">
                <span>{{
                    _formData.xingzou
                  }}</span>
              </div>
              <div class="flex align-center w100" v-else>
                <el-input v-model="_formData.xingzou" disabled> </el-input>
                <div class="flex align-center right-btn-opera">
                  <i class="iconfont iconfont-a-161 font-13-vw"></i>
                  <i class="iconfont iconfont-a-162 font-13-vw"></i>
                </div>
              </div>
            </el-form-item>
          </template> -->

            <el-form-item label="行走位置" v-if="locationPoseObj?.xingzou">
              <div class="check-state" v-if="!isEdit">
                <span>{{ _formData.xingzou }}</span>
              </div>
              <div class="flex align-center w100" v-else>
                <el-input v-model="_formData.xingzou" disabled> </el-input>
                <div class="flex align-center right-btn-opera">
                  <i class="iconfont iconfont-a-161 font-13-vw"></i>
                  <i class="iconfont iconfont-a-162 font-13-vw"></i>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="精确行走" v-if="locationPoseObj?.jingque">
              <div class="check-state" v-if="!isEdit">
                <span>{{ _formData.jingque }}</span>
              </div>
              <div class="flex align-center w100" v-else>
                <el-input v-model="_formData.jingque" disabled> </el-input>
                <div class="flex align-center right-btn-opera">
                  <i class="iconfont iconfont-a-165 font-13-vw"></i>
                  <i class="iconfont iconfont-a-164 font-13-vw"></i>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="机身高度" v-if="locationPoseObj?.jigao">
              <div class="check-state" v-if="!isEdit">
                <span>{{ _formData.jigao }}</span>
              </div>
              <div class="flex align-center w100" v-else>
                <el-input v-model="_formData.jigao" disabled> </el-input>
                <div class="flex align-center right-btn-opera">
                  <i class="iconfont iconfont-a-159 font-13-vw"></i>
                  <i class="iconfont iconfont-a-160 font-13-vw"></i>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="机身朝向" v-if="locationPoseObj?.jichao">
              <div class="check-state" v-if="!isEdit">
                <span>{{ _formData.jichao }}</span>
              </div>
              <div class="flex align-center w100" v-else>
                <el-input v-model="_formData.jichao" disabled> </el-input>
                <div class="flex align-center right-btn-opera">
                  <i class="iconfont iconfont-a-165 font-13-vw"></i>
                  <i class="iconfont iconfont-a-161 font-13-vw"></i>
                  <i class="iconfont iconfont-a-163 font-13-vw"></i>
                  <i class="iconfont iconfont-a-162 font-13-vw"></i>
                  <i class="iconfont iconfont-a-164 font-13-vw"></i>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="相机角度" v-if="locationPoseObj?.xjjiaodu">
              <div class="check-state" v-if="!isEdit">
                <span>{{ _formData.xjjiaodu }}</span>
              </div>
              <div class="flex align-center w100" v-else>
                <el-input v-model="_formData.xjjiaodu" disabled> </el-input>
                <div class="flex align-center right-btn-opera">
                  <i class="iconfont iconfont-a-166 font-13-vw"></i>
                  <i class="iconfont iconfont-a-159 font-13-vw"></i>
                  <i class="iconfont iconfont-a-163 font-13-vw"></i>
                  <i class="iconfont iconfont-a-160 font-13-vw"></i>
                  <i class="iconfont iconfont-a-167 font-13-vw"></i>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="补光角度" v-if="locationPoseObj?.bgjiaodu">
              <div class="check-state" v-if="!isEdit">
                <span>{{ _formData.bgjiaodu }}</span>
              </div>
              <div class="flex align-center w100" v-else>
                <el-input v-model="_formData.bgjiaodu" disabled> </el-input>
                <div class="flex align-center right-btn-opera">
                  <i class="iconfont iconfont-a-166 font-13-vw"></i>
                  <i class="iconfont iconfont-a-159 font-13-vw"></i>
                  <i class="iconfont iconfont-a-163 font-13-vw"></i>
                  <i class="iconfont iconfont-a-160 font-13-vw"></i>
                  <i class="iconfont iconfont-a-167 font-13-vw"></i>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="补光亮度" v-if="locationPoseObj?.bgliangdu">
              <div class="check-state" v-if="!isEdit">
                <span>{{ _formData.bgliangdu }}</span>
              </div>
              <div class="flex align-center w100" v-else>
                <el-input v-model="_formData.bgliangdu" disabled> </el-input>
                <div class="flex align-center right-btn-opera">
                  <i
                    class="iconfont iconfont-minus-rectangle font-16-vw move-left-1"
                  ></i>
                  <i
                    class="iconfont iconfont-add-rectangle font-16-vw move-left-1"
                  ></i>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="水平角度" v-if="locationPoseObj?.shuiping">
              <div class="check-state" v-if="!isEdit">
                <span>{{ _formData.shuiping }}</span>
              </div>
              <div class="flex align-center w100" v-else>
                <el-input v-model="_formData.shuiping" disabled> </el-input>
                <div class="flex align-center right-btn-opera">
                  <i class="iconfont iconfont-a-161 font-13-vw"></i>
                  <i class="iconfont iconfont-a-162 font-13-vw"></i>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="垂直角度" v-if="locationPoseObj?.chuizhi">
              <div class="check-state" v-if="!isEdit">
                <span>{{ _formData.chuizhi }}</span>
              </div>
              <div class="flex align-center w100" v-else>
                <el-input v-model="_formData.chuizhi" disabled> </el-input>
                <div class="flex align-center right-btn-opera">
                  <i class="iconfont iconfont-a-159 font-13-vw"></i>
                  <i class="iconfont iconfont-a-160 font-13-vw"></i>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="变焦值" v-if="locationPoseObj?.bianjiao">
              <div class="check-state" v-if="!isEdit">
                <span>{{ _formData.bianjiao }}</span>
              </div>
              <div class="flex align-center w100" v-else>
                <el-input v-model="_formData.bianjiao" disabled> </el-input>
                <div class="flex align-center right-btn-opera">
                  <i
                    class="iconfont iconfont-minus-rectangle font-16-vw move-left-1"
                  ></i>
                  <i
                    class="iconfont iconfont-add-rectangle font-16-vw move-left-1"
                  ></i>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="变倍值" v-if="locationPoseObj?.bianbei">
              <div class="check-state" v-if="!isEdit">
                <span>{{ _formData.bianbei }}</span>
              </div>
              <div class="flex align-center w100" v-else>
                <el-input v-model="_formData.bianbei" disabled> </el-input>
                <div class="flex align-center right-btn-opera">
                  <i
                    class="iconfont iconfont-minus-rectangle font-16-vw move-left-1"
                  ></i>
                  <i
                    class="iconfont iconfont-add-rectangle font-16-vw move-left-1"
                  ></i>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="画面区域" v-if="locationPoseObj?.huamian">
              <div class="check-state" v-if="!isEdit">
                <span>{{ _formData.huamian }}</span>
              </div>
              <el-input v-model="_formData.huamian" disabled v-else> </el-input>
            </el-form-item>
          </el-form>
          <el-form
            :model="_formData"
            v-else
            label-width="120px"
            label-position="left"
          >
            <el-form-item label="预置点">
              <el-select
                v-model="_formData.presetPoint"
                placeholder="请选择动作类型"
                @change="actionTypeChange"
              >
                <template #prefix v-if="_formData.actionType">
                  <i
                    :class="
                      'iconfont iconfont-' +
                      actionTypeOption.find(
                        (i) => i.actionTypeValue == _formData.actionType
                      )?.actionTypeIcon
                    "
                    style="margin-right: 2px"
                  ></i>
                </template>
                <el-option
                  v-for="item in actionTypeOption"
                  :key="item.actionTypeValue"
                  :label="item.actionTypeLabel"
                  :value="item.actionTypeValue"
                >
                  <span style="float: left">
                    <i
                      :class="'iconfont iconfont-' + item.actionTypeIcon"
                      style="margin-right: 10px"
                    ></i>
                  </span>
                  <span style="float: left; color: #8492a6; font-size: 13px">{{
                    item.actionTypeLabel
                  }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
      <!-- <div id="name3"></div> -->
      <!-- <el-collapse-item name="name3" id="name3" style="opacity: 0;ba" v-if="0">
        <template #title>告警设置</template>
        <div>
          <el-form :model="formData" label-width="120px" label-position="left">
            <el-form-item label="行走位置">
              <el-radio-group v-model="size">
                <el-radio-button label="正常" />
                <el-radio-button label="告警" />
                <el-radio-button label="严重" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="运动物体">
              <el-radio-group v-model="size">
                <el-radio-button label="正常" />
                <el-radio-button label="告警" />
                <el-radio-button label="严重" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="区域标记">
              <div class="flex align-center w100">
                <el-input
                  v-model="formData.name"
                  placeholder="(0,0)~(1920,1080)"
                >
                </el-input>
                <div
                  class="flex align-center justify-center w-36px h-36px border-1px"
                  style="
                    border-color: rgba(0, 255, 243, 0.5);
                    border-left: none;
                  "
                >
                  <i class="iconfont iconfont-bianji-01 font-14-vw"></i>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="人员安全">
              <el-radio-group v-model="size">
                <el-radio-button label="正常" />
                <el-radio-button label="告警" />
                <el-radio-button label="严重" />
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item> -->
    </div>
  </el-collapse>
</template>

<script setup>
import { defineEmits, getCurrentInstance } from "@vue/runtime-core";
import { ref, onMounted, watch } from "vue";
import { Calendar, Search, ArrowDownBold } from "@element-plus/icons-vue";
import addPatrolPointOptions from "../js/addPatrolPointOption.js";

const activeCollapse = ref(["point-info", "location-pose"]);
const props = defineProps({
  formData: {
    type: Object,
    default: {},
  },
});

let isEdit = ref(true);

const { list } = addPatrolPointOptions();
let _formData = ref({});
let actionTypeOption = ref([]);
let locationPoseObj = ref({});
let locationPoseArr = ref([]);
watch(
  () => props.formData,
  (newVal, oldVal) => {
    // 切换站点、监测设备、动作类型 重新赋值中间变量
    if (oldVal == undefined || Object.keys(newVal).length == 1) {
      _formData.value = { ...newVal };
      _formData.value.editType = _formData.value.editType ?? "1";
    }
  },
  {
    immediate: true,
  }
);
actionTypeOption.value = list.find(
  (item) => item.devicesTypeValue == "2"
).actionTypeOption;
locationPoseObj.value = actionTypeOption.value.find(
  (item) => item.actionTypeValue == _formData.value.actionType
)?.locationPoseObj;

const emit = defineEmits(["updateForm"]);
watch(
  () => ({ ..._formData.value }),
  (newVal, oldVal) => {
    // 不监听editType属性 传给父组件点位信息，位姿参数
    if (oldVal.editType == newVal.editType) {
      // 切换动作类型 位姿属性清空
      if (newVal.actionType != oldVal.actionType) {
        for (let key in locationPoseObj.value) {
          delete _formData.value[key];
        }
        delete _formData.value.presetPoint;
      }
      emit("updateForm", _formData.value);
    }
  },
  {
    deep: true,
  }
);

let showDropDown = ref(false);
const handleSelectChange = (val) => {
  showDropDown.value = !showDropDown.value;
};

let canUsePresetPoint = actionTypeOption.value.find(
  (item) => item.actionTypeValue == _formData.value.actionType
)?.canUsePresetPoint;
let activeLPType = ref(0);

// const { proxy } = getCurrentInstance();
// console.log(proxy.$bus);
// const tempTop = ref(250);
onMounted(() => {
  // 赋值位姿参数
  for (let key in locationPoseObj.value) {
    _formData.value[key] = "--";
    locationPoseArr.value.push(key);
  }
  console.log(locationPoseArr.value);
  //每次选择新类型后都会重新加载组件，故要保留上一次的信息,但是部分非表单数据状态需要存储一下状态复原
  const dom = document.querySelector("#publicBox");
  // // 观察器的配置（需要观察什么变动）
  // const config = { attributes: true, childList: true, subtree: true };

  // // 当观察到变动时执行的回调函数
  // const callback = function(mutationsList, observer) {
  //   let dom=document.querySelector('#name3')
  //   let rect=dom.getBoundingClientRect();
  //   // console.log(rect)
  //   tempTop.value=rect.top
  //   proxy.$bus.emit('updateTop',rect.top)
  // };

  // // 创建一个观察器实例并传入回调函数
  // const observer = new MutationObserver(callback);

  // // 开始观察目标节点
  // observer.observe(dom, config);

  // // 以后，你可以停止观察
  // // observer.disconnect();
});
</script>
<style scoped lang="less">
@import "@/assets/css/variable.less";
.drawer-header {
  width: 100%;
  height: 4.63vh;
  background: url(../../../assets/img/table_header.png);
  margin-bottom: 0 !important;
  cursor: pointer;
  i {
    margin: 0 0.5208vw;
  }
}
.body-form {
  // height: 76vh;
  margin-bottom: 1.12vh;
  position: relative;
  .right-btn-opera {
    height: 3.8vh;
    border: 1px solid @primary--light-50;
    border-left: 0;
    padding: 0 0.46vw;
    i {
      width: 0.68vw;
      text-align: center;
      &:not(:last-child) {
        margin-right: 0.76vw;
      }
      &.move-left-1 {
        transform: translateX(-1px);
      }
    }
  }
}

:deep(.el-form) {
  padding-left: 0.52vw;
  .el-form-item__label {
    width: 4.57vw !important;
    font-size: 0.73vw !important;
  }
}
</style>
