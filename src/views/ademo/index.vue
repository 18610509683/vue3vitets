<template>
  <div class="collapse_box">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item :title="item.id.toString()" v-for="item in DATA.children" :key="item.id">
        <template #title>
          <el-checkbox label="" @click.stop="() => { }" @change="($event: any) => toggleSpace($event, item)">{{ item.name
          }}</el-checkbox>
        </template>
        <div class="group_box collapse-content">
          <div class="">
            <el-checkbox-group v-model="checkedList">
              <el-checkbox :label="itm.name" v-for="itm in item.children" :key="itm.id"
                @change="checkBoxClicked"></el-checkbox>
            </el-checkbox-group>
          </div>

        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
console.log(ref, reactive)
interface Obj {
  name: string,
  id: number | string,
  children: Obj[]
}
const createData = () => {
  let OBJ: Obj = {
    name: 'root',
    id: -1,
    children: []
  }

  for (let i = 0; i < 10; i++) {
    let obj1: Obj = {
      id: i,
      name: `空间${i}`,
      children: []
    }
    for (let j = 100 * i + 10; j < (100 * i + 100 + 10); j++) {
      let obj: Obj = {
        id: j,
        name: `${i}_${j}设备`,
        children: []
      }
      for (let k = 10 * j + 1010; k < 10 * j + 1020; k++) {
        let obj2: Obj = {
          id: k,
          name: `${i}_${j}_${k}摄像头`,
          children: []
        }
        obj.children.push(obj2)
      }
      obj1.children.push(obj)
    }
    OBJ.children.push(obj1)
  }
  console.log(OBJ)
  return OBJ;
}
const DATA = reactive(createData());
const checkedList = ref([]);
const activeNames = reactive(['1'])
const handleChange = (val: number[]) => {
  console.log(val)
  console.log(checkedList)
}
const toggleSpace = (val: any, item: any) => {
  console.log(val, item)
  console.log(checkedList)
}
const checkBoxClicked = (val: any) => {
  console.log(val)
  console.log(checkedList)
}
watch(() => activeNames, (nV) => {
  console.log(nV)
})
const test: (number | string)[] = [1, '2', 2]
console.log(test)
</script>

<style scoped></style>