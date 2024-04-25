<template>
  <div class="page full_wh flex">
    <div class="model-left h100"><slot name="left"></slot>可见光 {{ publicData }}</div>
    <div class="model-right h100 flex flex-direction">
      <slot name="swd"></slot>
      <div class="model-form h100 flex-1">
        <slot name="right"></slot>
        <el-collapse>
          <el-collapse-item name="1">
            <template #title>测试1</template>
            <div>测试内容</div>
          </el-collapse-item>
          <el-collapse-item name="2">
            <template #title>测试1</template>
            <div>测试内容</div>
          </el-collapse-item>
          <el-collapse-item name="3">
            <template #title>测试1</template>
            <div>测试内容</div>
          </el-collapse-item>

          <el-collapse-item name="4">
            <template #title>测试1</template>
            <div>测试内容</div>
          </el-collapse-item>
          <el-collapse-item name="5">
            <template #title>测试1</template>
            <div>测试内容</div>
          </el-collapse-item>
          <el-collapse-item name="6">
            <template #title>测试1</template>
            <div>测试内容</div>
          </el-collapse-item>
          <el-collapse-item name="7">
            <template #title>测试1</template>
            <div>测试内容</div>
          </el-collapse-item>
          <el-collapse-item name="8">
            <template #title>测试1</template>
            <div>测试内容</div>
          </el-collapse-item>
          <el-collapse-item name="9">
            <template #title>测试1</template>
            <div>测试内容</div>
          </el-collapse-item>
          <el-collapse-item name="10">
            <template #title>测试1</template>
            <div>测试内容</div>
          </el-collapse-item>
          <el-collapse-item name="11">
            <template #title>测试1</template>
            <div>测试内容</div>
          </el-collapse-item>
          <el-collapse-item name="12">
            <template #title>测试1</template>
            <div>测试内容</div>
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
const props = defineProps({
  publicData: {
    type: Object,
  },
});
const cancelClick = () => {};
const confirmClick = () => {};
onMounted(() => {
});
</script>

<style lang="scss" scoped>
@import "../../../../assets/css/typeBaseStyle.scss";
</style>
