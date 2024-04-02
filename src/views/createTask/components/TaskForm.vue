<template>
  <div class="task-form w100 h100 flex flex-direction hidden-xy">
    <div class="header">
      <el-select>
        <template #prefix>
          <span class="my-prefix">唐阳</span>
        </template>
      </el-select>
    </div>
    <div class="content flex-1 scroll-y">
      <el-collapse v-model="activeCol" accordion>
        <el-collapse-item name="custom">
          <template #title>
            <div
              :class="[
                'flex align-center title',
                activeCol == 'custom' ? 'text-active-all' : '',
              ]"
            >
              <div
                :class="[
                  activeCol == 'custom' ? 'label-active' : '',
                  'label flex align-center justify-center font-12 font600',
                ]"
              >
                1
              </div>
              <span class="font-16 font600 mx-10px">任务定制</span>
              <i
                v-if="activeCol != 'custom'"
                class="iconfont iconfont-arrow-go font-12 text-active"
              ></i>
            </div>
          </template>
          <CustomForm></CustomForm>
        </el-collapse-item>
        <el-collapse-item title="定时时间" name="time">
          <template #title>
            <div
              :class="[
                'flex align-center title',
                activeCol == 'time' ? 'text-active-all' : '',
              ]"
            >
              <div
                :class="[
                  activeCol == 'time' ? 'label-active' : '',
                  'label flex align-center justify-center font-12 font600',
                ]"
              >
                2
              </div>
              <span class="font-16 font600 mx-10px">定时时间</span>
              <i
                v-if="activeCol != 'time'"
                class="iconfont iconfont-arrow-go font-12 text-active"
              ></i>
            </div>
          </template>
          <TimeForm></TimeForm>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="footer flex justify-end">
      <el-button type="info" class="mr-18px">取消</el-button>
      <el-dropdown placement="top">
        <div class="flex my-dropdown cursor-pointer align-center">
          <span class="h100 flex align-center justify-center"> 立即执行 </span>
          <i class="iconfont iconfont-xia my-dropdown-arrow"></i>
        </div>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CustomForm from "./taskForm/CustomForm.vue";
import TimeForm from "./taskForm/TimeForm.vue";
let activeCol = ref("custom");
</script>

<style lang="scss" scoped>
.task-form {
  padding: 0 0.5208vw 0 1.0417vw;
  .header {
    .my-prefix {
      color: #00fff3;
      position: relative;
      padding-right: 9px;
      &::after {
        content: "";
        position: absolute;
        height: 80%;
        width: 2px;
        background: linear-gradient(
          0deg,
          transparent,
          rgba(255, 255, 255, 0.5),
          transparent
        );
        top: 50%;
        transform: translateY(-50%);
        right: 0;
      }
    }
  }
  .content {
    .title {
      position: relative;
      .label {
        border: 1px solid #fff;
        height: 1.6667vh;
        width: 1.6667vh;
        border-radius: 0.8333vh;
        background: rgba(255, 255, 255, 0.15);
        &-active {
          border: 1px solid #00fff3;
          background: rgba(0, 255, 243, 0.15);
        }
      }
      &::before {
        position: absolute;
        content: "";
        height: 11px;
        width: 100%;
        background: linear-gradient(90deg, #51f9ff, transparent);
        opacity: 0.3;
        bottom: 0;
        left: -0.52vw;
        transform: translateY(-50%);
      }
    }
    :deep(.el-collapse) {
      .el-collapse-item__header {
        border: none;
      }
      .el-collapse-item__arrow {
        display: none;
      }
    }
  }
  .footer {
    .my-dropdown {
      height: 3.1481vh;
      border: 1px solid #00fff3;
      background-color: rgba(0, 255, 243, 0.15);
      span {
        padding: 10px;
        border-right: 1px solid;
        border-color: inherit;
      }
      i {
        padding: 10px 6px;
        color: #00fff3;
      }
    }
  }
}
</style>
