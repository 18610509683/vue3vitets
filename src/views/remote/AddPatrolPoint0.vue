<template>
<div class="w100 h100 p10-vw">
  <div class="modal-wrap">
    <LightCornerBox  width="10px" border-width="1px" class="lightCorner-Box flex-1 p10-vw">
      <div class="addPoint-model flex align-center h100">
        <div class="model-left h100">
          <component v-bind:is="currentActionType">
            <template #title>
              <div class="content-title font-16-vw">采集巡检点</div>
            </template>
          </component>
        </div>
        <div class="model-right h100">
          <AddPatrolPointDialog />
        </div>
      </div>
    </LightCornerBox>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted, watch, defineEmits,getCurrentInstance } from "vue"
import AddPatrolPointDialog from './model-right/addPatrolPointDialog.vue'
import vlPhoto from "./model-left/vlPhoto.vue";
import InfraredTemperature from "./model-left/InfraredTemperature.vue";

let currentActionType = ref(vlPhoto);
let componentOptions = ref(
  {
    label:'可见光抓拍',
    value: 0,
    component: vlPhoto,
  },
  {
    label:'红外测温',
    value: 1,
    component: InfraredTemperature,
  }
);

</script>
<style lang="less">
@import "@/assets/css/variable.less";

.addPoint-model{
  .model-left{
    flex: 1;
    padding: 0 1.04vw 0.93vh 0.52vw;

    .model-left-header{
      height: 4.63vh;
    }
    .model-left-content{
      margin-top: 1.12vh;
    }
  }
  .model-right{
    width: 20.62vw;
    padding-left: 0.52vw;
    border-left: 1.5px solid @border--light-05;  
  }
}
</style>
