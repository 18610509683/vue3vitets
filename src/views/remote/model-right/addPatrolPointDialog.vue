<template>
  <el-collapse v-model="activeNames">
    <div class="body-form" id="publicBox">
      <el-collapse-item name="name1">
        <template #title>点位信息</template>
        <div>
          <el-form :model="form" label-width="120px" label-position="left">
            <el-form-item label="巡检设备">
              <el-select v-model="form.equitname" placeholder="请选择巡检设备">
                <!-- <template #prefix>
                      <i :class="'iconfont iconfont-' + item.icon + ''" style="margin-right: 2px;"></i>
                    </template> -->
                <el-option
                  v-for="item in ActionTypeOptions"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
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
            <el-form-item label="点位名称">
              <div
                class="w100 flex align-center flex-sub point-name"
                :class="{ 'is-focus': showDropDown }"
              >
                <el-select
                  v-model="selectName"
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
                <el-input
                  v-if="false"
                  v-model="form.name"
                  placeholder="请输入巡检点名称"
                  maxlength="20"
                  show-word-limit
                >
                </el-input>
                <el-select
                  v-if="true"
                  v-model="selectName"
                  placeholder=""
                  @visible-change="handleSelectChange"
                >
                  <el-option label="正面点位" value="1" />
                  <el-option label="背面点位" value="2" />
                </el-select>
              </div>
            </el-form-item>
            <el-form-item label="所在场景" class="form-item-disabled">
              <el-select
                v-model="form.env"
                placeholder="请选择所在场景"
                disabled
              >
                <!-- <template #prefix>
                      <i :class="'iconfont iconfont-' + item.icon + ''" style="margin-right: 2px;"></i>
                    </template> -->
                <el-option
                  v-for="item in ActionTypeOptions"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
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
              <el-select
                v-model="form.area"
                placeholder="请选择所在区域"
                disabled
              >
                <!-- <template #prefix>
                      <i :class="'iconfont iconfont-' + item.icon + ''" style="margin-right: 2px;"></i>
                    </template> -->
                <el-option
                  v-for="item in ActionTypeOptions"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
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
            <el-form-item label="动作类型">
              <el-select
                v-model="form.ActionType"
                placeholder="please select your zone"
                @change="actionTypeChange"
              >
                <!-- <template #prefix>
                      <i :class="'iconfont iconfont-' + item.icon + ''" style="margin-right: 2px;"></i>
                    </template> -->

                <el-option
                  v-for="item in ActionTypeOptions"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
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
          </el-form>
        </div>
      </el-collapse-item>
      <el-collapse-item name="name2">
        <template #title>位姿参数</template>
        <div>
          <el-form :model="form" label-width="120px" label-position="left">
            <el-form-item label="行走位置">
              <div class="flex align-center w100">
                <el-input v-model="form.name" placeholder="请输入行走位置">
                </el-input>
                <div class="flex align-center right-btn-opera">
                  <i class="iconfont iconfont-xia-copy font-14-vw"></i>
                  <i class="iconfont iconfont-shang-copy font-14-vw"></i>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="水平角度">
              <div class="flex align-center w100">
                <el-input v-model="form.name" placeholder="请输入水平角度">
                </el-input>
                <div class="flex align-center right-btn-opera">
                  <i class="iconfont iconfont-xia-copy font-14-vw"></i>
                  <i class="iconfont iconfont-shang-copy font-14-vw"></i>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="垂直角度">
              <div class="flex align-center w100">
                <el-input v-model="form.name" placeholder="请输入垂直角度">
                </el-input>
                <div class="flex align-center right-btn-opera">
                  <i class="iconfont iconfont-shang font-14-vw"></i>
                  <i class="iconfont iconfont-xia font-14-vw"></i>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="变焦值">
              <div class="flex align-center w100">
                <el-input v-model="form.name" placeholder="请输入变焦值">
                </el-input>
                <div class="flex align-center right-btn-opera">
                  <i class="iconfont iconfont-add-rectangle font-18-vw"></i>
                  <i class="iconfont iconfont-minus-rectangle font-18-vw"></i>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="变倍值">
              <div class="flex align-center w100">
                <el-input v-model="form.name" placeholder="请输入变倍值">
                </el-input>
                <div class="flex align-center right-btn-opera">
                  <i class="iconfont iconfont-add-rectangle font-18-vw"></i>
                  <i class="iconfont iconfont-minus-rectangle font-18-vw"></i>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="画面区域">
              <el-input v-model="form.name" placeholder="(0,0)~(1920,1080)">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
      <div id="name3"></div>
      <el-collapse-item name="name3" id="name3" style="opacity: 0;ba" v-if="0">
        <template #title>告警设置</template>
        <div>
          <el-form :model="form" label-width="120px" label-position="left">
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
                <el-input v-model="form.name" placeholder="(0,0)~(1920,1080)">
                </el-input>
                <div class="flex align-center justify-center w-36px h-36px border-1px" style="border-color: rgba(0, 255, 243, 0.5);border-left: none;">
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
      </el-collapse-item>
    </div>
  </el-collapse>

</template>

<script setup>
import { defineEmits,getCurrentInstance } from '@vue/runtime-core';
import { ref, onMounted, watch } from "vue";
import { Calendar, Search, ArrowDownBold } from "@element-plus/icons-vue";
const activeNames=ref(['name1'])
const { proxy } = getCurrentInstance();
console.log(proxy.$bus)
const props=defineProps({
  formData:{
    type:Object,
    default:null
  }
})

let val = ref();
let form = ref({
  equitname: "jvbu",
  name: "",
  env: "hongwai",
  area: "lianpai",
  ActionType: null,
});
let ActionTypeOptions = ref([
  { name: "可见光抓拍", value: "zhuapai", icon: "tubiao_kejianguangzhuapai-42" },
  { name: "红外测温", value: "hongwai", icon: "redtemp" },
  { name: "环境监测", value: "huanjing", icon: "tubiao_huanjingjiance" },
  { name: "表计识别", value: "biaoji", icon: "kejianguangshibie" },
  { name: "连拍", value: "lianpai", icon: "tubiao_hengxianglianpai-40" },
  { name: "局部放电检测", value: "fangdian", icon: "tubiao_fangdianjiance" },
  { name: "守望", value: "shouwang", icon: "shouwang" },
]);
const emit=defineEmits(['updateForm'])
const actionTypeChange=(val)=>{
  console.log(val)
  emit('updateForm',form.value)
}

let showDropDown = ref(false);
const handleSelectChange = (val) => {
  showDropDown.value = val;
};


const tempTop=ref(250)
onMounted(()=>{
  //每次选择新类型后都会重新加载组件，故要保留上一次的信息,但是部分非表单数据状态需要存储一下状态复原
  form.value=props.formData
  const dom=document.querySelector('#publicBox');
  // // 选择目标节点
  // const targetNode = document.getElementById('myElement');
  
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
})
</script>
<style scoped lang="less">
@import "@/assets/css/variable.less";
.drawer-header {
  width: 100%;
  height: 4.63vh;
  background: url(../../../assets/img/table_header.png);
  margin-bottom: 0 !important;
  cursor: pointer;
  i{
    margin: 0 0.5208vw;
  }
}
.body-form {
  // height: 76vh;
  margin-bottom: 1.12vh;
  overflow-y: auto;
  position: relative;
  .right-btn-opera {
    width: 3.54vw;
    height: 3.8vh;
    border: 1px solid @primary--light-50;
    border-left: 0;
    i {
      width: 50%;
      text-align: center;
    }
  }
}

:deep(.el-form) {
  padding-left: 0.52vw;
  .el-form-item__label {
    width: 4.57vw !important;
    font-size: 0.73vw !important;
  }
  .point-name {
    height: 3.7vh;
    border: 1px solid @primary--light-50;
    .el-select__wrapper {
        box-shadow: none;
    }

    .edit-type {
      span {
        color: rgba(0, 255, 243, 1);
      }
      .el-select__wrapper {
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
          top: 0.8vh;
          right: 0;
        }
        .el-input__inner {
          color: @primary;
        }
      }
    }

    &.is-focus {
      border-color: @primary;
      .el-select__icon svg {
        color: @primary !important;
      }
    }
    .el-input__wrapper {
      border: 0;
    }
  }
}
</style>
