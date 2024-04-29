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
      <slot name="custom" :index="index"></slot>
      <SingleForm :ref="setFormRef" v-model:formData="item.form"></SingleForm>
    </div>
  </div>
</template>

<script setup>
import SingleForm from "./SingleForm";
import { ref, onMounted, watch, computed } from "vue";
import { dataTypeOptions } from "./js/dataTypeOptions";
import dayjs from "dayjs";
const multipleRef = ref();
let tabArr = ref([
  {
    id: dayjs().valueOf().toString(),
    form: JSON.parse(JSON.stringify(dataTypeOptions[0].formTemplate)),
  },
]);
let activeForm = ref(tabArr.value[0]);
//添加表单
const addForm = () => {
  tabArr.value.push({
    id: dayjs().valueOf().toString(),
    form: JSON.parse(JSON.stringify(dataTypeOptions[0].formTemplate)),
  });
  activeForm.value = tabArr.value[tabArr.value.length - 1];
};
//切换表单
const switchForm = (val) => {
  let index = tabArr.value.findIndex((itm) => itm.id == activeForm.value.id);
  activeForm.value = val;
  console.log(activeForm.value);
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

//多表单验证函数
let formRefList = ref([]);
const setFormRef = (el) => {
  if (el && !formRefList.value.includes(el)) {
    formRefList.value.push(el);
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
  () => activeForm.value,
  (val) => {}
);
onMounted(() => {
  activeForm.value = tabArr.value[0];
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
}
</style>
