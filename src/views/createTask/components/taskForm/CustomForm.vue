<template>
  <div class="">
    <div class="custom-form-header">
      <el-input></el-input>
      <div class="flex align-center my-10px">
        <el-checkbox
          :indeterminate="checkAll.indeterminate"
          v-model="checkAll.all"
        ></el-checkbox>
        <span class="ml-10px">已选择</span>
        <span class="text-active mx-2px">{{ 4 }}</span>
        <span>个需要巡检的设备，共{{ 32 }}个设备</span>
      </div>
    </div>
    <div class="custom-form-filter flex mt-15px cursor-pointer">
      <el-input></el-input>
      <i
        class="iconfont iconfont-shaixuan-moren ml-10px filter-btn flex align-center"
      ></i>
    </div>
    <div class="custom-form-list scroll-y">
      <el-tree
        class="my-collapse-tree"
        style="max-width: 600px"
        :data="deviceTree"
        show-checkbox
        node-key="id"
        ref="treeRef"
        :props="{
          children: 'children',
          label: 'name',
        }"
        default-expand-all
      >
        <template #default="{ node, data }">
          <div class="custom-tree-node flex flex-1 align-center hidden-xy" @click="()=>{
            if(!node.data.children){
              mySetCheckedKey(node.data.id)
            }
          }">
            <i :class="['iconfont-silent mr-5px iconfont-' + node.data.icon]"></i>
            <span class="flex-1 truncate">{{
              node.label
            }}</span>
            <template v-if="node.data.belong">
              <span>{{ node.data.belong }}</span>
            </template>
            <template v-else>
              <span class="tool-btn cursor-pointer">
                {{ "定位" }}
              </span>
              <span class="tool-btn ml-28px cursor-pointer">
                {{ "查看" }}
              </span>
            </template>
          </div>
        </template>
      </el-tree>
    </div>
    <div class="custom-form-footer mt-20px">
      <el-form label-position="left">
        <el-form-item label="结束动作">
          <el-select></el-select>
        </el-form-item>
        <el-form-item label="全程记录">
          <el-checkbox>可见光录音</el-checkbox>
          <el-checkbox>录音</el-checkbox>
        </el-form-item>
        <el-form-item label="巡检点总数">
          <div class="count-box w100 h100 px-10px flex align-center">143/1433个</div>
        </el-form-item>
        <el-form-item label="预计总耗时">
          <div class="count-box w100 h100 px-10px flex align-center">1234mins</div>
        </el-form-item>
        <el-form-item label="预计总里程数">
          <div class="count-box w100 h100 px-10px flex align-center">1234.5m</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
let checkAll = ref({
  indeterminate: true,
  all: false,
});
let deviceTree = ref([
  {
    name: "阅江线220kv",
    id: "123",
    belong: "PT柜",
    icon: "dianlanjietou",
    children: [
      {
        name: "接头本体",
        id: "1234",
        icon: "shexiangtou",
      },
      {
        name: "接头测温",
        id: "1235",
        icon: "shexiangtou",
      },
      {
        name: "接头本体2",
        id: "1236",
        icon: "shexiangtou",
      },
    ],
  },
  {
    name: "阅江线220kv2",
    id: "124",
    belong: "PT柜",
    icon: "dianlanjietou",
    children: [
      {
        name: "接头本体",
        id: "1244",
        icon: "shexiangtou",
      },
      {
        name: "接头测温",
        id: "1245",
        icon: "shexiangtou",
      },
      {
        name: "接头本体2",
        id: "1246",
        icon: "shexiangtou",
      },
    ],
  },
  {
    name: "阅江线3220kv",
    id: "125",
    belong: "PT柜",
    icon: "dianlanjietou",
    children: [
      {
        name: "接头本体",
        id: "1254",
        icon: "shexiangtou",
      },
      {
        name: "接头测温",
        id: "1255",
        icon: "shexiangtou",
      },
      {
        name: "接头本体2",
        id: "1256",
        icon: "shexiangtou",
      },
    ],
  },
]);
// const mySetCheckedKey=(id)=>{
//   let arr=treeRef.value.getCheckedKeys()
//   console.log(arr,id);
//   if(arr.find(item=>item==id)){
//     treeRef.value.setCheckedKeys(arr.filter(item=>item!==id),true)
//   }
//   else{
//     treeRef.value.setCheckedKeys([...arr,id],false)
//   }
// }
const treeRef=ref()
</script>

<style lang="scss" scoped>
.custom-form-header {
  border-bottom: 1px solid rgba(0, 255, 243, 0.15);
}
.custom-form-filter {
  .filter-btn {
    border: 1px solid rgba(0, 255, 243, 0.15);
    padding: 0 8px;
    &:hover {
      border-color: rgba(0, 255, 243, 1);
    }
  }
}
.custom-form-list {
  max-height: 31.1111vh;
  height: auto;
  :deep(.el-tree) {
    &.my-collapse-tree {
      .el-tree-node__content {
        height: 4.4444vh;
        border-bottom: 1px solid rgba(0, 255, 243, 0.15);
        .el-tree-node__expand-icon {
          display: none;
        }
        .custom-tree-node {
          .tool-btn {
            color: rgba(0, 255, 243, 0.5);
            &:hover {
              color: #00fff3;
            }
          }
        }
      }
      .el-tree-node__children {
        .el-tree-node {
          margin: 0;
          .el-tree-node__content {
            padding-left: 22px !important;
            border: none;
            &:hover {
              background-color: rgba(0, 255, 243, 0.15);
            }
          }
        }
      }
      .el-tree-node {
        &::before,
        &::after {
          content: none;
        }
      }
    }
  }
}
.custom-form-footer {
  .count-box {
    background-color: #064955;
  }
  :deep(.el-form) {
    .el-form-item .el-form-item__label {
      min-width: 110px;
      color: rgba(255, 255, 255, 0.8);
    }
  }
}
</style>
