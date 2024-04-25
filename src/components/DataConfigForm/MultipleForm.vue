<template>
  <div class="multiple-box" ref="multipleRef">
    <div
      class="tab-box"
      :style="{
        '--p': (activeForm - 1) * 26 + activeForm * 17 + 'px',
      }"
    >
      <div class="tab-box-item">
        <div
          v-for="(item, index) in tabArr"
          :class="[
            'circle flex align-center justify-center',
            activeForm == item ? 'active' : '',
          ]"
          @click="
            () => {
              activeForm = item;
              console.log(formRefList[index].form);
            }
          "
        >
          {{ index + 1 }}
        </div>
        <div
          class="add-circle flex align-center justify-center"
          @click="
            () => {
              tabArr.push(tabArr.length + 1);
              activeForm = tabArr.length;
            }
          "
        >
          <i class="iconfont iconfont-wubian-add"></i>
        </div>
      </div>
    </div>
    <div v-for="(item, index) in tabArr" v-show="activeForm == item">
      <slot name="custom" :index="index"></slot>
      <SingleForm :ref="setRef"></SingleForm>
    </div>
  </div>
</template>

<script setup>
import SingleForm from "./SingleForm";
import { ref, onMounted, watch, computed } from "vue";
const multipleRef = ref();
let tabArr = ref([1]);
let activeForm = ref(1);
let formRefList = ref([]);
const setRef = (el) => {
  if (!formRefList.value.includes(el)) {
    formRefList.value.push(el);
  }
};
let formArr = computed(() => {
  return formRefList.value.map((item) => item.form) ?? null;
});
//删除表单
const deleteForm = (index) => {
  if (tabArr.value.length > 1) {
    if (activeForm.value == tabArr.value[index]) {
      activeForm.value = tabArr.value[index - 1];
    }
    tabArr.value.splice(index, 1);
    formRefList.value.splice(index, 1);
  }
};
//多表单验证函数
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
onMounted(() => {});
defineExpose({
  validate: multipleFormValidate,
  formArr,
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
