<template>
  <div class="page_box flex_row_between full_wh" desc="巡检结果页">
    <div class="left_box full_h">
      <LightCornerBox class="full_wh">
        <div class="content_body full_wh">
          <div class="full_wh scroll_box">
            <div class="full_w">
              <div class="flex_row_between" style="padding-right: 8px;">
                <el-button class="btn_fanhui" type="primary"><i class="icon kr-icon kr-icon-xiaoyuhao"></i></el-button>
                <el-input class="btn_input" v-model="searchValue" placeholder="请输入搜索关键词">
                  <template #prefix>
                    <i class="icon kr-icon kr-icon-tubiao_sousuo color6 font16"></i>

                  </template>
                </el-input>
              </div>

              <div class="title_left">报告摘要</div>
            </div>
            <div class="list_box">
              <div style="height: 10px;"></div>
              <div v-for="itm in 300">{{ itm }}</div>
              <div style="height: 10px;"></div>
            </div>
          </div>
        </div>
      </LightCornerBox>

    </div>
    <div class="right_box full_h">
      <LightCornerBox class="full_wh">
        <div class="content_body2 full_wh">
          <div class="flex_row_between">
            <div class="font22">巡检任务1001</div>
            <el-button class="btn_confirm" type="primary">确认结果</el-button>
          </div>
          <div class="flex_row_between title_bg">
            <div class="left_title flex">
              <img src="./img/01.png" alt="">
              <span class="font22">巡检结果</span>
            </div>
          </div>
          <div class="result_box">
            <div class="zhuangshi flex_row">
              <img src="./img/02.png" alt="">
              <div>巡检结果<span class="color4">8个</span></div>
            </div>
          </div>
        </div>
      </LightCornerBox>
    </div>

  </div>
</template>

<script setup lang="ts">
import LightCornerBox from '@/components/LightCornerBox.vue';
import testC from '@/components/CanvasDragZoom.vue'
const searchValue = ref('')
import data from './data.js'
console.log(data)
console.log(testC)
</script>

<style lang="scss" scoped>
@import "@/assets/css/base.hdj.scss";
$borderColor: rgba(0, 143, 153, .5);
$activeColor: rgba(0, 143, 153, 1);

$borderColor2: rgba(0, 143, 153, .1);

/* 内阴影+圆角 */
::-webkit-scrollbar-track {
  box-shadow: none !important;
}

.page_box {
  padding: 0.5208vw;
}

.left_box {
  width: 19.7917vw;
  background-image: linear-gradient(#0c3e4b, #0c3745);
  border: .1px solid $borderColor2;
  position: relative;
}



.left_box::after {
  width: 96%;
  display: block;
  height: 16px;
  content: '';
  position: absolute;
  left: 2px;
  bottom: 2px;
  background-image: linear-gradient(rgba(12, 55, 68, 0.5), rgba(12, 55, 68, 1));
}

.right_box {
  width: 78.1771vw;
  // background-color: rgba(12, 55, 68, 1);
  border: .1px solid $borderColor2;
  position: relative;
}

.content_body {
  padding: 0.5208vw;
  padding-right: 0;
  overflow: hidden;
  position: relative;
}

.color2 {
  color: #000;
}

.content_body2 {
  padding: 0.5208vw;
  padding-top: 20px;
  overflow: hidden;
  position: relative;

  .btn_confirm {
    width: 5.2083vw;
    height: 3.2407vh;
    background-color: #0d6d79;
    background-color: rgba(0, 143, 153, 1);

    :deep(span) {
      color: #e6eff0;
      font-size: 14px;
    }
  }

  .title_bg {
    margin-top: 18px;
    padding: 1.4815vh;
    background-color: #0c5460;
  }

  .left_title {
    img {
      width: 2.2222vh;
    }

    span {
      margin-top: -2px;
      margin-left: 8px;
    }
  }
  .result_box{
    .zhuangshi{
      margin-top: 40px;
      *{
        margin-left: 10px;
        span{
          margin-left: 16px;
        }
      }
    }
  }
}

.scroll_box {
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.btn_fanhui {
  width: 3.1481vh;
  height: 3.1481vh;
  background-color: transparent;
  border: 1px solid $borderColor;

  &:active {
    border: 1px solid $activeColor;
  }

  i {
    display: block;
    font-size: 12px;

  }
}

.btn_input {
  margin-left: 0.5208vw;
}

.title_left {
  margin-top: 2.5vh;
  font-size: 1.8519vh;
  font-family: Sarasa Gothic SC;
  font-weight: 600;
  color: #FFFFFF;
  line-height: 3.7037vh;
  letter-spacing: .05em;
}

.color6 {
  color: rgba(0, 255, 243, 1);
}

.list_box {
  flex: 1;
  overflow-y: scroll;
  position: relative;

  &::before {
    // width: calc(100% - 10px);
    width: 18vw;
    display: block;
    height: 16px;
    content: '';
    position: fixed;
    z-index: 2;
    left: 1.0417vw;
    background-image: linear-gradient(rgba(12, 62, 75, 1), rgba(12, 62, 75, 0.5));
  }
}

.el-input {
  :deep(.el-input__wrapper) {
    background-color: transparent;
    height: 3.1481vh;
    box-shadow: 0 0 0 1px $borderColor inset;
  }

  :deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px $activeColor inset;
  }

  :deep(.el-input__inner) {
    color: #fff;
  }
}
</style>