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
        <div class="point-box flex align-center justify-center pointer icon-sty" @click="modelPoints" title="采集巡检点">
          <i class="iconfont iconfont-kejianguangshibie" ></i>
        </div>
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
        <div class="point-box flex align-center justify-center">
          <i class="iconfont iconfont-redtemp" ></i>
        </div>
      </div>      
    </LightCornerBox>

    <!-- 采集巡检点 -->
    <el-drawer  ref="drawerRef" v-model="PointsDialog" class="el-drawer-Box" :append-to-body="false" >
      <template #header>
        <div class="drawer-header flex align-center">
          <div class="font-16">唐阳 </div> <hr /> <div class="font-16"> 前方摄像头</div>          
        </div>
      </template>
      <div class="drawer-body">
        <div class="body-top">
          <div class="title font-16">采集巡检点</div>
          <div class="desc font-14">通过机器人或固定摄像头采集巡检点，以便日后自动或手动执行巡检。需要继续巡检设备、点位名称和具体动作类型。</div>
        </div>
        <div class="body-form">
          <div class="title">点位信息</div>
          <div>
            <el-form :model="form" label-width="120px" label-position="left">
              <el-form-item label="巡检设备">
                <el-select v-model="form.equitname" placeholder="请选择巡检设备">
                  <!-- <template #prefix>
                    <i :class="'iconfont iconfont-' + item.icon + ''" style="margin-right: 2px;"></i>
                  </template> -->                                
                  <el-option  v-for="item in ActionTypeOptions"  :key="item.value"  :label="item.name" :value="item.value" >
                    <span style="float: left;">
                      <i :class="'iconfont iconfont-' + item.icon + ''" style="margin-right: 10px;"></i>
                    </span>
                    <span style="float: left; color: #8492a6; font-size: 13px">{{
                      item.name}}</span>
                  </el-option>
                  
                </el-select>
              </el-form-item>
              <el-form-item label="点位名称">
                <el-input v-model="form.name" class="w-50 m-2" placeholder="请输入巡检点名称" maxlength="20"  show-word-limit>
                  <template #prefix>
                    <span class="primary font-12">新增 </span><span class="font-12" style="color: #4D7B8E;margin-left: 6px;"> | </span>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="所在场景">
                <el-select v-model="form.env" placeholder="please select your zone" disabled >
                  <!-- <template #prefix>
                    <i :class="'iconfont iconfont-' + item.icon + ''" style="margin-right: 2px;"></i>
                  </template> -->                                
                  <el-option  v-for="item in ActionTypeOptions"  :key="item.value"  :label="item.name" :value="item.value" >
                    <span style="float: left;">
                      <i :class="'iconfont iconfont-' + item.icon + ''" style="margin-right: 10px;"></i>
                    </span>
                    <span style="float: left; color: #8492a6; font-size: 13px">{{
                      item.name}}</span>
                  </el-option>
                  
                </el-select>
              </el-form-item>
              <el-form-item label="所在区域">
                <el-select v-model="form.area" placeholder="please select your zone" disabled >
                  <!-- <template #prefix>
                    <i :class="'iconfont iconfont-' + item.icon + ''" style="margin-right: 2px;"></i>
                  </template> -->                                
                  <el-option  v-for="item in ActionTypeOptions"  :key="item.value"  :label="item.name" :value="item.value" >
                    <span style="float: left;">
                      <i :class="'iconfont iconfont-' + item.icon + ''" style="margin-right: 10px;"></i>
                    </span>
                    <span style="float: left; color: #8492a6; font-size: 13px">{{
                      item.name}}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="动作类型">
                <el-select v-model="form.ActionType" placeholder="please select your zone">
                  <!-- <template #prefix>
                    <i :class="'iconfont iconfont-' + item.icon + ''" style="margin-right: 2px;"></i>
                  </template> -->
                                
                  <el-option  v-for="item in ActionTypeOptions"  :key="item.value"  :label="item.name" :value="item.value" >
                    <span style="float: left;">
                      <i :class="'iconfont iconfont-' + item.icon + ''" style="margin-right: 10px;"></i>
                    </span>
                    <span style="float: left; color: #8492a6; font-size: 13px">{{
                      item.name}}</span>
                  </el-option>
                  
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>        
      </div>

      <template #footer>
        <div style="flex: auto">
          <el-button class="el-btn-cancel" @click="cancelClick">取 消</el-button>
          <el-button type="primary" @click="confirmClick">开始采集</el-button>
        </div>
      </template>
     </el-drawer>
  </div>
  
</template>

<script setup>
import { ref, onMounted, watch, defineEmits } from "vue";
import { Calendar, Search, ArrowDownBold } from '@element-plus/icons-vue'
let val = ref()
let PointsDialog = ref(false)
let form = ref({
  equitname: 'jvbu',
  name: '',  
  env: 'hongwai',
  area: 'lianpai',
  ActionType: 'kejianguang',
})
let ActionTypeOptions = ref([
  { name: '可见光抓拍', value: 'kejianguang', icon: 'kejianguangshibie'},
  { name: '红外测温', value: 'hongwai', icon: 'guangfubanfanxiangdianliu1'},
  { name: '环境监测', value: 'huanjing', icon: 'redtemp'},
  { name: '连拍', value: 'lianpai', icon: 'editor'},
  { name: '局部放电检测', value: 'jvbu', icon: 'kejianguangshibie'},
  { name: '红外抓拍', value: 'hongZhua', icon: 'redtemp'},
])
const emit = defineEmits(['addPointEmits'])


const modelPoints = () => {
  PointsDialog.value = true
}
const cancelClick = () => {
  PointsDialog.value = false
}
const confirmClick = () => {
  PointsDialog.value = false
  emit('addPointEmits')
}

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
  .drawer-body{
    .body-top{
      .title{
        height: 3vh;
        line-height: 3vh;
        width: 5.21vw;
        background: url('@/assets/img/remote/title-bg.png') no-repeat 0 100%;
        background-size: 100% 70%;
      }
      .desc{
        color: rgba(255, 255,255,0.8);
        line-height: 1.9;
        padding: 10px;
      }
    }  
    .body-form{
      .title{
        color: rgba(255,255,255,0.5);
        margin-top: 2.3vh;
        margin-bottom: 2.3vh;
      }

    }  
  }
}

:deep(.el-form){
  padding-left: 0.52vw;
  .el-form-item__label{
    width: 4.17vw!important;
  }
}


 
</style>
