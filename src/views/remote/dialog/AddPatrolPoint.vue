<template>
  <div class="modal-wrap ">
    <LightCornerBox  width="10px" border-width="1px" class="lightCorner-Box flex-1 pad-10">
      <el-icon class="close-icon"><CloseBold /></el-icon>
      <div class="addPoint-model flex align-center h100">
        <div class="model-left h100">

        </div>
        <div class="model-right h100">
          <div class="drawer-header flex align-center">
            <div class="font-16">唐阳 </div> <hr /> <div class="font-16"> 前方摄像头</div>          
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
                    
                    <template #prepend>
                      <el-select v-model="selectName" placeholder="Select" style="width: 50px">
                        <el-option label="新增" value="1" />
                        <el-option label="更新" value="2" />
                        <template #suffix>
                          <span>jj</span>
                        </template>
                      </el-select>
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
            <div class="title">位姿参数</div>
            <div>
              <el-form :model="form" label-width="120px" label-position="left">                
                <el-form-item label="行走位置">
                  <div class="flex align-center w100">
                    <el-input v-model="form.name" class="w-50 m-2" placeholder="请输入行走位置" >
                    </el-input>
                    <div class="flex align-center right-btn-opera">
                      <i class="iconfont iconfont-kejianguangshibie pointer" ></i>
                      <i class="iconfont iconfont-kejianguangshibie pointer" ></i>
                    </div>
                  </div>                 
                </el-form-item>
                <el-form-item label="水平角度">
                  <div class="flex align-center w100">
                    <el-input v-model="form.name" class="w-50 m-2" placeholder="请输入行走位置" >
                    </el-input>
                    <div class="flex align-center right-btn-opera">
                      <i class="iconfont iconfont-kejianguangshibie pointer" ></i>
                      <i class="iconfont iconfont-kejianguangshibie pointer" ></i>
                    </div>
                  </div>                 
                </el-form-item>
                <el-form-item label="垂直角度">
                  <div class="flex align-center w100">
                    <el-input v-model="form.name" class="w-50 m-2" placeholder="请输入行走位置" >
                    </el-input>
                    <div class="flex align-center right-btn-opera">
                      <i class="iconfont iconfont-kejianguangshibie pointer" ></i>
                      <i class="iconfont iconfont-kejianguangshibie pointer" ></i>
                    </div>
                  </div>                 
                </el-form-item>
                <el-form-item label="变焦值">
                  <div class="flex align-center w100">
                    <el-input v-model="form.name" class="w-50 m-2" placeholder="请输入行走位置" >
                    </el-input>
                    <div class="flex align-center right-btn-opera">
                      <i class="iconfont iconfont-kejianguangshibie pointer" ></i>
                      <i class="iconfont iconfont-kejianguangshibie pointer" ></i>
                    </div>
                  </div>                 
                </el-form-item>
                <el-form-item label="变倍值">
                  <div class="flex align-center w100">
                    <el-input v-model="form.name" class="w-50 m-2" placeholder="请输入行走位置" >
                    </el-input>
                    <div class="flex align-center right-btn-opera">
                      <i class="iconfont iconfont-kejianguangshibie pointer" ></i>
                      <i class="iconfont iconfont-kejianguangshibie pointer" ></i>
                    </div>
                  </div>                 
                </el-form-item>
                <el-form-item label="画面区域">
                  <el-input v-model="form.name" class="w-50 m-2" placeholder="请输入行走位置" >
                    </el-input>                 
                </el-form-item>
              </el-form>
            </div>
            <div class="title">告警设置</div>
            <div>
              <el-form :model="form" label-width="120px" label-position="left">                
                <el-form-item label="行走位置">
                  <!-- <div class="flex align-center w100"> -->
                    <el-radio-group v-model="size" label="size control">
                      <el-radio-button label="large">正常</el-radio-button>
                      <el-radio-button label="default">告警</el-radio-button>
                      <el-radio-button label="small">严重</el-radio-button>
                    </el-radio-group>
                  <!-- </div>                  -->
                </el-form-item>
                
              </el-form>
            </div>
          </div> 

          <div class="model-btn-sty">
            <el-button class="el-btn-cancel" @click="cancelClick">取 消</el-button>
            <el-button type="primary" @click="confirmClick">保 存</el-button>
          </div>
        </div>
      </div>
    </LightCornerBox>
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


</script>
<style scoped lang="less">
@import "@/assets/css/variable.less";
.addPoint-model{
  .model-left{
    flex: 1;
  }
  .model-right{
    width: 20.62vw;
    padding-left: 10px;
    border-left: 1px solid rgba(0, 143, 153, 0.25);
    .drawer-header{
      padding: 0 10px;
      width: 100%;
      height: 4.63vh;
      background: rgba(0, 255, 243, 0.2);
      margin-bottom: 0!important;      
    }
    .body-form{
      .title{
        color: rgba(255,255,255,0.5);
        margin-top: 1.3vh;
        margin-bottom: 1.3vh;
        height: 3.7vh;
        line-height: 3.7vh;
        border-bottom: 1px solid rgba(0, 143, 153, 0.25);
        padding: 0 5px;
      }
      .right-btn-opera{
        width: 3.54vw;
        height: 3.15vh;
        border: 1px solid @primary--light-50;
        border-left: 0;
        i{
          width: 50%;
          text-align: center;
          color: @primary--light-50;
          &:hover{
            color: @primary;
          }
        }
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
