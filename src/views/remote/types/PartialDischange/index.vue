<template>
  <div class="page full_wh flex">
    <div class="model-left h100">局放监测 {{ publicData }}</div>
    <div class="model-right h100 flex flex-direction">
      <slot name="swd"></slot>
      <div class="model-form h100 flex-1">
        <slot name="right"></slot>
        <el-collapse>
          <el-collapse-item name="放电监测">
            <template #title>放电监测</template>
            <el-form>
              <el-form-item label="数据匹配">
                <el-input>
                  <template #prefix>
                    <el-select v-model="selectValue">
                      <el-option value="1" label="11111111111111111111111"></el-option>
                    </el-select>
                  </template>
                </el-input>
              </el-form-item>
            </el-form>
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
let form=ref({

})
let selectValue=ref(1)
const cancelClick = () => {};
const confirmClick = () => {};
onMounted(() => {
});
</script>

<style lang="scss" scoped>
@import "../../css/typeBaseStyle.scss";
.page{
  :deep(.el-input){
    .el-input__prefix-inner{
      margin-right: 15px;
      &::after{
        content:"";
        height: 50%;
        width: 1px;
        background: linear-gradient(to top,transparent,#fff,transparent);
      }
      .el-select__wrapper{
        box-shadow: none;
        width: auto;
        min-width: 60px;
        padding: 0;
        .el-select__suffix{
          display: none;
        }
      }
    }
    }
}
</style>
