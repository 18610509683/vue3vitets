<template>
  <div style="background-color: #0c3e4c; width: 50%; padding: 20px 10px">
    <div style="width: 300px; height: 100%">
      <siteWithDevice
      ref="mySiteWithDeviceRef"
      :box-height="600"
        :site-width="'30%'"
        :visible-count="12"
        :get-station-api="getStationApi"
        :get-device-tree-api="getTreeApi"
        :get-device-tree-type-api="getTreeTypeApi"
        @site-change="siteChange"
        @device-change="deviceChange"
      />
    </div>
    <div class="text">
      <div>当前站点：{{ curSite?.label }}</div>
      <div>当前设备：{{ curDevice?.name }}</div>
    </div>
    <hr>
    <div class="button">
      <p>外部调用切换设备方法,请为组件定义一个ref对象</p>
      <button @click="mySiteWithDeviceRef.prevDevice">上一个设备</button>
      <button @click="mySiteWithDeviceRef.nextDevice">下一个设备</button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
let curSite = ref();
let curDevice = ref();
const mySiteWithDeviceRef=ref()
const getStationApi = (params) => {
  return new Promise((resolve, reject) => {
    resolve({
      data: {
        list: [{ siteId: "167037857943322624", stationName: "唐阳" }],
        total:1
      },
    });
  });
};
const getTreeApi = (params) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://10.30.1.125:11086/alarm/device/device-tree", params, {
        headers: {
          curSite: "167037857943322624",
        },
      })
      .then((res) => {
        if (res.data) {
          resolve(res.data);
        }
      });
  });
};
const getTreeTypeApi = (params) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://10.30.1.125:11086/alarm/device/device-type-tree", params, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data) {
          resolve(res.data);
        }
      })
      .catch((err) => {
        reject(false);
        console.log(err);
      });
  });
};
const siteChange=(val)=>{
    curSite.value=val
}
const deviceChange=(val)=>{
    curDevice.value=val
}
</script>

<style scoped>
.text{
    *{
        color: white;
    }
}
.button p{
  color: white;
}
.button button{
  margin-right: 10px;
}
</style>