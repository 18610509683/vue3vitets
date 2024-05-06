<template>
  <el-table :data="tableData" style="width: 100%" highlight-current-row	>
    <el-table-column prop="date" label="Date" width="180"/>
    <el-table-column prop="name" label="Name" width="180" sortable  show-overflow-tooltip/>
    <el-table-column prop="address" label="Address"/>
    <el-table-column
        prop="tag"
        label="Tag"
        width="300"
    >
      <template #default>
        <div style="display:flex;">
          <el-tag type="danger">111</el-tag>
          <el-tag type="warning">111</el-tag>
          <el-button link type="primary">查看</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
const tableData = [
  {
    date: '2016-05-03',
    name: 'TomTomTomTomTomTom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: '',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>
