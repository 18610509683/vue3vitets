<template>
  <el-upload
      class="upload-demo"
      drag
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      multiple
  >
    <el-icon class="el-icon--upload">
      <upload-filled/>
    </el-icon>
    <div class="el-upload__text">
      将文件拖到此处，或 <em>点击上传</em>
    </div>
    <div class="el-upload__text">
      支持扩展名：.rar .zip .jpg .png...
    </div>

  </el-upload>
</template>

<script setup lang="ts">
import {UploadFilled} from '@element-plus/icons-vue'
</script>
