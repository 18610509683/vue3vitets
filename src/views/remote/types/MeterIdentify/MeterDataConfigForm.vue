<template>
  <div class="multiple-box" ref="multipleRef">
    <div
      class="tab-box"
      :style="{
        '--p':
          tabArr.findIndex((itm) => itm.id == activeForm.id) * 43 + 17 + 'px',
      }"
    >
      <div class="tab-box-item">
        <div
          v-for="(item, index) in tabArr"
          :class="[
            'circle flex align-center justify-center',
            activeForm.id == item.id ? 'active' : '',
          ]"
          @click="switchForm(item)"
        >
          {{ index + 1 }}
        </div>
        <div
          class="add-circle flex align-center justify-center"
          @click="addForm"
        >
          <i class="iconfont iconfont-wubian-add"></i>
        </div>
      </div>
    </div>
    <div v-for="(item, index) in tabArr" v-show="activeForm.id == item.id">
      <el-form>
        <el-form-item label="识别对象">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="区域标记">
          <el-input disabled>
            <template #suffix>
              <i class="iconfont iconfont-bianji-01"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="表计类型">
          <div class="mix-box w100" tabindex="1">
            <el-select class="pre-select" placeholder="" @change="">
              <el-option></el-option>
            </el-select>
            <el-select @change="">
              <el-option label="不选择模板" value="custom"></el-option>
            </el-select>
          </div>
        </el-form-item>
      </el-form>
      <div v-for="(itm, idx) in item.formArr">
        <div
          class="w100 flex align-center justify-between"
          style="padding-left: 0.52vw"
        >
          <el-checkbox
            v-model="itm.isEdit"
            :label="itm.desc"
            @change="
              () => {
                itm.row = itm.column = 0;
              }
            "
          ></el-checkbox>
          <div class="flex align-center" v-show="itm.isEdit">
            行<el-input
              v-model="itm.row"
              :style="{
                width: '50px',
                margin: '0 5px',
              }"
              @change="(val) => resetPointList(itm)"
            ></el-input
            >x 列<el-input
              v-model="itm.column"
              @change="(val) => resetPointList(itm)"
              :style="{
                width: '50px',
                margin: '0 5px',
              }"
            ></el-input>
            <i
              :class="[
                'iconfont-add-rectangle iconfont mx-5px',
                itm.pointMethod == 'forbidden' ? 'iconfont-active' : '',
              ]"
              @click="pointHandle(itm, 'forbidden')"
            ></i>
            <i
              :class="[
                'iconfont iconfont-bianji-01 mx-5px',
                itm.pointMethod == 'nullable' ? 'iconfont-active' : '',
              ]"
              @click="pointHandle(itm, 'nullable')"
            ></i>
          </div>
        </div>
        <div style="padding-left: 0.52vw" class="w100">
          <div
            class="w100 flex justify-start my-10px"
            v-if="itm.row * itm.column > 0"
            v-for="(jtm, jdx) in Array.from({ length: itm.row })"
          >
            <div
              :class="[
                'point-tab flex align-center justify-center mr-10px',
                itm.activePointIndex == jdx * itm.column + pdx ? 'active' : '',
                itm.configFormArr[jdx * itm.column + pdx]?.disabled
                  ? 'forbidden'
                  : '',
                itm.configFormArr[jdx * itm.column + pdx] ? '' : 'not-exist',
              ]"
              v-for="(ptm, pdx) in Array.from({ length: itm.column })"
              @click="clickOrSetPoint(itm, jdx * itm.column + pdx)"
            >
              {{ jdx * itm.column + pdx + 1 }}
            </div>
          </div>
        </div>
        <SingleForm
          v-if="itm.isEdit && itm.row * itm.column"
          v-model:formData="itm.configFormArr[itm.activePointIndex].form"
        ></SingleForm>
      </div>
    </div>
  </div>
</template>

<script setup>
import SingleForm from "@/components/DataConfigForm/SingleForm.vue";
import { ref, onMounted, watch, computed, nextTick } from "vue";
import { dataTypeOptions } from "@/components/DataConfigForm/js/dataTypeOptions";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";
const props = defineProps({
  tabData: {
    type: Array,
    default: null,
  },
});
let test = ref();
const multipleRef = ref();
let formGroup = [
  {
    desc: "上侧指示灯组",
    column: 0,
    row: 0,
    isEdit: false,
    pointMethod: null,
    activePointIndex: 0,
    configFormArr: [
      {
        form: JSON.parse(JSON.stringify(dataTypeOptions[0].formTemplate)),
        disabled: false,
      },
    ],
  },
  {
    desc: "下侧指示灯组",
    column: 0,
    row: 0,
    isEdit: false,
    pointMethod: null,
    activePointIndex: 0,
    configFormArr: [
      {
        form: JSON.parse(JSON.stringify(dataTypeOptions[0].formTemplate)),
        disabled: false,
      },
    ],
  },
  {
    desc: "左侧指示灯组",
    column: 0,
    row: 0,
    isEdit: false,
    pointMethod: null,
    activePointIndex: 0,
    configFormArr: [
      {
        form: JSON.parse(JSON.stringify(dataTypeOptions[0].formTemplate)),
        disabled: false,
      },
    ],
  },
  {
    desc: "右侧指示灯组",
    column: 0,
    row: 0,
    isEdit: false,
    pointMethod: null,
    activePointIndex: 0,
    configFormArr: [
      {
        form: JSON.parse(JSON.stringify(dataTypeOptions[0].formTemplate)),
        disabled: false,
      },
    ],
  },
];
let tabArr = ref([
  {
    id: dayjs().valueOf().toString(),
    formArr: JSON.parse(JSON.stringify(formGroup)),
  },
]);
let activeForm = ref(tabArr.value[0]);
/* ------------创建点位 start-------------- */
let pointMethod = ref();
//开启、关闭置空、禁用功能
const pointHandle = (itm, type) => {
  if (itm.pointMethod == type) {
    itm.pointMethod = null;
  } else {
    itm.pointMethod = type;
  }
};
//设置点位列表
const resetPointList = (itm) => {
  let realLen = itm.column * itm.row;
  if (realLen > itm.configFormArr.length) {
    itm.configFormArr = Array.from({ length: realLen }, (item, index) => ({
      form: JSON.parse(JSON.stringify(dataTypeOptions[0].formTemplate)),
      disabled: false,
      row: Math.floor(index / itm.column),
      column: (index + 1) % itm.column || Number(itm.column),
    }));
  } else if (realLen < itm.configFormArr.length) {
    itm.configFormArr.splice(realLen);
  }
};
//编辑点位状态（选中、禁用、置空）
const clickOrSetPoint = (itm, index) => {
  if (itm.activePointIndex == index && itm.pointMethod) {
    ElMessage.info("正在编辑的点位不可操作！");
    return;
  } else if (
    !itm.pointMethod &&
    itm.configFormArr[index] &&
    !itm.configFormArr[index].disabled
  ) {
    itm.activePointIndex = index;
  } else if (itm.pointMethod == "forbidden") {
    itm.configFormArr[index].disabled = !itm.configFormArr[index].disabled;
  } else if (itm.pointMethod == "nullable") {
    if (itm.configFormArr[index]) {
      console.log(index);
      itm.configFormArr[index] = null;
    } else {
      itm.configFormArr[index] = {
        form: JSON.parse(JSON.stringify(dataTypeOptions[0].formTemplate)),
        disabled: false,
        row: Math.floor(index / itm.column),
        column: (index + 1) % itm.column || Number(itm.column),
      };
    }
  }
};

/* ------------创建点位 end-------------- */

/* ------------tab start---------------- */
//初始化配置表tab数量和数据
const initTab = () => {
  tabArr.value = props.tabData.map((item, index) => ({
    id: dayjs().valueOf().toString(),
    formArr: item.formArr,
  }));
};
//添加表单
const addForm = () => {
  tabArr.value.push({
    id: dayjs().valueOf().toString(),
    formArr: JSON.parse(JSON.stringify(formGroup)),
  });
  activeForm.value = tabArr.value[tabArr.value.length - 1];
};
//切换表单
const switchForm = (val) => {
  let index = tabArr.value.findIndex((itm) => itm.id == activeForm.value.id);
  activeForm.value = val;
};
//删除表单
const deleteForm = (index) => {
  if (tabArr.value.length > 1) {
    activeForm.value = index
      ? tabArr.value[index - 1]
      : tabArr.value[index + 1];
    tabArr.value.splice(index, 1);
    formRefList.value.splice(index, 1);
  }
};
/* ------------tab end---------------- */

//多表单验证函数
let formRefList = ref([]);
const setFormRef = (el, index) => {
  if (formRefList.value[index]) {
    if (el && !formRefList.value[index].includes(el)) {
      formRefList.value[index].push(el);
    }
  } else {
    formRefList.value.push([el]);
  }
};
const multipleFormValidate = async () => {
  let validate = true;
  let msg = "";
  for (let i = 0; i < formRefList.value.length; i++) {
    let { validateFlag } = await formRefList.value[i].validate();
    if (!validateFlag) {
      validate = false;
      msg += `请检查第${i + 1}个表单！<br/>`;
    }
  }
  return {
    validateFlag: validate,
    msg,
  };
};
watch(
  () => props.tabData,
  (val) => {
    if (val) {
      // initTab()
    }
  }
);

onMounted(() => {
  console.log(tabArr.value);
  activeForm.value = tabArr.value[0];
  console.log(activeForm.value);
});
defineExpose({
  validate: multipleFormValidate,
  //   formArr,
  deleteForm,
});
</script>

<style lang="scss" scoped>
.multiple-box {
  position: relative;
  .tab-box {
    position: absolute;
    height: 100%;
    border-right: 1px solid;
    border-image: linear-gradient(180deg, rgba(0, 255, 243, 0.3), transparent) 1
      1;
    left: 0;
    transform: translate(-100%, 0);
    &::before {
      content: "";
      height: 15px;
      width: 1px;
      background: rgba(0, 255, 243, 0.3);
      position: absolute;
      top: 0;
      right: -5px;
      transform: translate(0, -96%) rotate(30deg);
    }
    &::after {
      content: "";
      width: 2px;
      height: 26px;
      background-color: #00fff3;
      position: absolute;
      right: -1px;
      top: var(--p);
      transition: all 0.3s;
    }
    .circle {
      height: 26px;
      width: 26px;
      border-radius: 13px;
      border: 1px solid;
      margin: 17px 11px;
      background-color: rgba(255, 255, 255, 0.1);
      cursor: pointer;
      position: relative;
    }
    .active {
      border: 1px dashed rgba(0, 255, 243, 1);
      color: #00fff3;
      background-color: rgba(0, 255, 243, 0.2);
    }
    .add-circle {
      height: 26px;
      width: 26px;
      border-radius: 13px;
      border: 1px dashed rgba(0, 255, 243, 1);
      margin: 17px 11px;
      background-color: rgba(0, 255, 243, 0.2);
    }
  }
  :deep(.el-form) {
    //混合表单项类型1：选择器+选择器/输入框
    .mix-box {
      border: 1px solid rgba(0, 255, 243, 0.5);
      display: flex;
      height: 3.1481vh;
      min-height: 34px;
      justify-content: center;
      padding: 0 5px;
      cursor: pointer;
      .el-input {
        flex: 1;
        height: 100%;
        .el-input__wrapper {
          box-shadow: none;
          border: none;
        }
      }
      .el-select {
        flex: 1;
        &.pre-select {
          max-width: 20%;
          .el-select__wrapper {
            padding: 0;
            &::after {
              content: "";
              height: 50%;
              width: 1px;
              background: linear-gradient(
                to top,
                transparent,
                #fff,
                transparent
              );
            }
            .el-select__selected-item {
              display: flex;
              justify-content: center;

              span {
                color: #00fff3;
              }
            }
          }
          .el-select__suffix {
            display: none;
          }
        }
        .el-select__wrapper {
          box-shadow: none;
        }
      }
      &-btn {
        color: rgba(0, 255, 243, 0.5);
        &:hover {
          color: #00fff3;
        }
      }
    }
  }
  .point-tab {
    border: 1px solid rgba(0, 255, 243, 0.5);
    height: 2.963vh;
    width: 2.963vh;
    border-radius: 2px;
    cursor: pointer;
    color: rgba(0, 255, 243, 0.5);
    i.active {
      color: #00fff3;
    }
    &.active,
    &:hover {
      border-color: #00fff3;
      color: #00fff3;
      background: rgba(0, 255, 243, 0.2);
    }
    &.forbidden {
      cursor:not-allowed;
      color: #073141;
      background: #0a6169;
      border-color: transparent;
    }
    &.not-exist {
      border-color: #4d7b8e;
      background:transparent;
      color: #4d7b8e;
      cursor:not-allowed;
    }
  }
}
</style>
