<template>
  <div style="display:flex;flex-flow: column;gap:10px;">
    <el-alert title="Success alert" type="success" show-icon/>
    <el-alert title="Success alert" type="success" close-text="查看详情"/>
    <el-alert title="Warning alert" type="warning" show-icon/>
    <el-alert title="Error alert" type="error" show-icon/>
    <el-alert
        class="kkd_custom_alert_description_class kkd_custom_alert_description_success_class"
        title="Success alert"
        type="success"
        description="More text description"
        show-icon
    />
    <el-alert
        class="kkd_custom_alert_description_class kkd_custom_alert_description_warning_class"
        title="Warning alert"
        type="warning"
        description="More text description"
        show-icon
    />
    <el-alert
        class="kkd_custom_alert_description_class kkd_custom_alert_description_error_class"
        title="Error alert"
        type="error"
        description="More text description"
        show-icon
    />
    <el-button @click="()=>{
        ElMessage({
          duration:0,
            showClose: true,
            message: 'Congrats, this is a success message.',
            type: 'warning',
          })
    }">click message one
    </el-button>
    <el-button @click="()=>{
        ElMessage({
          duration:0,
            showClose: true,
            message: 'Congrats, this is a success message.',
            type: 'error',
          })
    }">click message two</el-button>
  </div>

</template>

<style scoped lang="scss">

</style>
<script setup lang="ts">
import {ElMessage} from "element-plus";
</script>