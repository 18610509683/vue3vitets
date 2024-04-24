<script setup>
import {ref} from 'vue'
import { Search} from "@element-plus/icons-vue";
import ElSelect1 from "@/components/ElSelect1.vue";
import ElForm1 from "@/components/ElForm1.vue";
import ElPagination1 from "@/components/ElPagination1.vue";
import ElSwitch1 from "@/components/ElSwitch1.vue";
import ElSlider1 from "@/components/ElSlider1.vue";
import ElAlert1 from "@/components/ElAlert1.vue";
const activeNames = ref(['1','2'])
const input1 = ref('')
</script>

<template>
  <el-scrollbar height="100vh">
    <ul style="padding: 30px;">
      <ol>
        <label for="" style="color: #FFF">按钮</label>
        <div>
          <el-button type="primary">Primar1y</el-button>
          <el-button type="success">Primar1y</el-button>
          <el-button type="warning">Primar1y</el-button>
          <el-button type="info">Primar1y</el-button>
          <el-button type="danger">Primar1y</el-button>
        </div>
      </ol>
      <ol>
        <label for="" style="color: #FFF">搜索框</label>
        <div>
          <el-input
              class="kkd_el_input"
              v-model="input1"
              placeholder="请输入内容"
              :suffix-icon="Search"
          />
        </div>
      </ol>
      <ol>
        <ElForm1/>
      </ol>
      <ol>
        <ElPagination1/>
      </ol>
      <ol>
        <el-badge is-dot class="item" style="margin-right: 20px;">query</el-badge>
        <el-badge :value="200" :max="99" class="item" style="margin-right: 20px;">
          <el-button>comments</el-button>
        </el-badge>
        <el-badge :value="5" class="item" style="margin-right: 20px;">
          <el-button>comments</el-button>
        </el-badge>
      </ol>
      <ol>
        <ElSwitch1/>
      </ol>
      <ol>
        <ElSlider1/>
      </ol>
      <ol>
        <ElAlert1/>
      </ol>
      <br><br><br>
      <br><br><br>
      <br><br><br>
      <br><br><br>
    </ul>
  </el-scrollbar>


</template>

<style lang="scss">
@import "@/assets/style/element-theme";
ol{
  margin:15px auto;
}
</style>
