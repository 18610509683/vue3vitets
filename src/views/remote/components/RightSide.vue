
import { deepEqual } from 'assert';

<template>
  <div class="w100 h100 right-Box flex flex-direction">
    <div class="header-box">
    
    </div>
    <LightCornerBox  width="10px" border-width="1px" class="lightCorner-Box flex-1 margin-top-20 pad-10">
      <div class="w100 line flex align-center justify-between" >
        <div class="flex align-center">
          <el-input v-model="val" placeholder="设备点名称" :prefix-icon="Search" />
          <div class="arrowbox flex align-center justify-center"><el-icon><ArrowDownBold /></el-icon></div>
        </div>
        <div class="point-box"></div>
      </div>
      <div class="w100 line flex align-center justify-between  margin-top-15">
        <div class="two-box flex align-center">
          <div class="two-L flex align-center justify-center flex-1">
            <div class="">
              <el-icon><ArrowDownBold /></el-icon> 78%
            </div>
          </div>
          <div class="two-L flex align-center justify-center flex-1">
            <div class="">
              <el-icon><ArrowDownBold /></el-icon> 前往充电中
            </div>
          </div>
        </div>
        <div class="point-box"></div>
      </div>
      
    </LightCornerBox>

    <el-drawer  ref="drawerRef" v-model="dialog" class="el-drawer-Box" :append-to-body="false" >
      <template #header>
        <div class="drawer-header flex align-center">
          <div class="">唐阳 </div> <hr /> <div class=""> 前方摄像头</div>
        </div>
      </template>

      <div class="drawer-body">
        <div>采集巡检点</div>
      </div>

      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">cancel</el-button>
          <el-button type="primary" @click="confirmClick">confirm</el-button>
        </div>
      </template>
     </el-drawer>
  </div>
  
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { Calendar, Search, ArrowDownBold } from '@element-plus/icons-vue'
let val = ref()
let dialog = ref(true)

</script>
<style scoped lang="less">
@import "@/assets/css/variable.less";
.right-Box{    
  .header-box{
    height: 4.63vh;
    background: @primary--light-20;
  }
  .lightCorner-Box{
    background: linear-gradient(to bottom, rgba(12, 54, 67, 0.5), rgba(12, 62, 76, 0.5));
    .line{
      .el-input{
        width: 14.17vw;
        height: 3.15vh;
      }
      .arrowbox{
        width: 1.77vw;
        height: 3.15vh;
        border: 1px solid @primary;
        border-left: 0px;
      }
      .point-box{
        width: 3.15vh;
        height: 3.15vh;
        background: rgba(0,255,243,0.04);
      }
    }
    .two-box{
      width: 15.94vw;
      height: 3.15vh;
      border: 1px solid #0B4C57;
      .flex-1{
        height: 1.67vh;     
        &:nth-of-type(1){
          border-right: 1px solid #0B4C57;
        }     
      }
    }
  }

}

// 抽屉弹框
:deep(.el-drawer-Box){
  width: 20.62vw!important;
  height: calc(100% - 11.294vh);
  margin-top: 10.36vh;
  background-color: rgba(12, 54, 67, 1)!important;
  border: 1px solid #0B4C57;
  padding: 10px!important;
  .el-drawer__header{
    padding: 0 10px;
    width: 100%;
    height: 4.63vh;
    background: @primary--light-20;
  }
}
  
</style>
