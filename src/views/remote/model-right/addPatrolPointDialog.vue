<template>
  <div class="drawer-header flex align-center">
    <div class="font-16-vw">唐阳</div>
    <hr />
    <div class="font-16-vw">前方摄像头</div>
  </div>
  <el-collapse>
    <div class="body-form">
      <el-collapse-item name="1">
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
                class="w100 h100 flex align-center flex-sub point-name"
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
                placeholder="please select your zone"
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
                placeholder="please select your zone"
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
      <el-collapse-item name="2">
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
              <el-input v-model="form.name">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
      <el-collapse-item name="3">
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
          </el-form>
        </div>
      </el-collapse-item>
    </div>
  </el-collapse>
  <div class="model-btn-sty">
    <el-button class="el-btn-cancel" @click="cancelClick">取 消</el-button>
    <el-button type="primary" @click="confirmClick">保 存</el-button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineEmits } from "vue";
import { Calendar, Search, ArrowDownBold } from "@element-plus/icons-vue";
let val = ref();
let form = ref({
  equitname: "jvbu",
  name: "",
  env: "hongwai",
  area: "lianpai",
  ActionType: "kejianguang",
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

let showDropDown = ref(false);
const handleSelectChange = (val) => {
  showDropDown.value = val;
};
</script>
<style scoped lang="less">
@import "@/assets/css/variable.less";
.drawer-header {
  padding: 0 0.52vw;
  width: 100%;
  height: 4.63vh;
  background: rgba(10, 100, 108, 1);
  margin-bottom: 0 !important;
}
.body-form {
  height: 76vh;
  margin-bottom: 1.12vh;
  overflow-y: auto;

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
    border: 1px solid @primary--light-50;

    .edit-type {
      .el-input__wrapper {
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
