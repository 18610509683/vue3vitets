<template>
  <div class="w100 h100 my-swd">
    <siteWithDevice
      v-model="curSiteDevice"
      :box-height="boxHeight"
      :box-width="boxWidth"
      :site-width="'20%'"
      :is-switching-device="false"
      :visible-count="12"
      :stationProps="{
        value: 'stationId',
        label: 'stationName',
        type: 'stationType',
      }"
      :get-station-api="isMainSite() ? getStationPageApi : getStationApi"
      :get-device-tree-api="MyTreeDataApi"
      :is-need-filter-tree="true"
      :get-device-tree-type-api="MyTreeTypeApi"
      :iconBaseUrl="iconBaseUrl"
      :default-expanded-all="true"
    ></siteWithDevice>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import {
  getStationPageApi,
  TreeTypeApi,
  TreeDataApi,
} from "@/api/publicApi.js";
const props = defineProps({
  isAdaption: {
    type: Boolean,
    default: false,
  },
  adaptionDom: {
    type: String,
    default: null,
  },
  //设备树接口传参
  treeParams: {
    type: Object,
    default: {
      floorNameEnums: [],
      deviceTypeIds: [],
      deviceTypeEnums: [],
    },
  },
  //设备树类型接口传参
  treeTypeParams: {
    type: Array,
    default: {},
  },
});
const emits = defineEmits(["deviceChange"]);
const route = useRoute();
let curSiteDevice = ref({
  site: null,
  device: null,
});
/* -----------站点相关 start--------------- */
const isMainSite = () => {
  let curMainSite = sessionStorage.getItem("currentSite");
  curMainSite = JSON.parse(curMainSite);
  if (curMainSite) {
    // 是集控则请求接口获取站点列表，否则不请求接口
    return curMainSite?.isAdmin ? true : false;
  } else {
    // 不存在主站点信息，证明处于开发环境，直接请求接口获取站点列表
    return true;
  }
};

//主站点为场站，不请求接口直接将主站点信息构造成一条数据赋值给站点列表
const getStationApi = () => {
  let curMainSite = sessionStorage.getItem("currentSite");
  curMainSite = JSON.parse(curMainSite);
  return new Promise((resolve, reject) => {
    resolve({
      data: {
        list: [
          {
            stationId: curMainSite?.id ?? null,
            stationName: curMainSite?.name ?? null,
            icon: curMainSite?.icon ?? null,
          },
        ],
        total: 1,
      },
    });
  });
};
/* -----------站点相关 end--------------- */

/* --------------设备树api相关 start--------------- */
//注意！！！！！！！！！！本处可能不是查全部设备的接口，后期注意替换
const MyTreeTypeApi = () => {
  return new Promise(async (resolve, reject) => {
    let res = await TreeTypeApi(props.treeTypeParams);
    resolve({
      data: res.data,
    });
  });
};
const MyTreeDataApi = (params) => {
  return new Promise(async (resolve, reject) => {
    let res = await TreeDataApi({ ...props.treeParams, ...params });
    resolve({
      data: res.data,
    });
  });
};
/* --------------设备相关 end--------------- */

/* -----------弹窗大小自适应模块 start---------------- */
let boxHeight = ref(821);
let boxWidth = ref(395);
const adaptionFunc = () => {
  if (props.isAdaption) {
    let dom = document.querySelector(props.adaptionDom);
    boxHeight.value = dom.offsetHeight;
    boxWidth.value = dom.offsetWidth;
  }
};
/* -----------弹窗大小自适应模块 end---------------- */

/* -----------初始化站点 start-------------- */
//初始化站点
const initSite = () => {
  let krAppSite = sessionStorage.getItem("krAppSite");
  if (krAppSite) {
    krAppSite = JSON.parse(krAppSite);
    curSiteDevice.value.site = {
      ...krAppSite,
      value: krAppSite.id ?? krAppSite.value,
      label: krAppSite.name ?? krAppSite.label,
    };
  }
};
/* -----------初始化站点 end-------------- */
/* -----------设备相关 start------------- */
//路由读取设备信息
const initDevice = () => {
  let { deviceId, deviceName } = route.query;
  if (deviceId) {
    curSiteDevice.value["device"] = {
      id: deviceId,
      name: deviceName,
    };
    emits("deviceChange", curSiteDevice.value.device);
  }
};
watch(
  () => curSiteDevice.value?.site,
  (val) => {
    sessionStorage.setItem("krAppSite", JSON.stringify(val));
    initDevice();
  }
);

watch(
  () => curSiteDevice.value?.device,
  (val) => {
    if (val) {
      emits("deviceChange", val);
    }
  }
);
/* --------------设备相关 end---------------------- */

onMounted(() => {
  initSite();
  adaptionFunc();
  window.addEventListener("resize", adaptionFunc);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", adaptionFunc);
});
</script>

<style lang="scss" scoped>
.my-swd {
  :deep(.site-with-device) {
    border: none;
    .kr-select-dropdown,
    .device-tree-drop-down {
      z-index: 3;
    }
    .tree-enter-to,
    .tree-leave,
    .tree-leave-from {
      opacity: 1;
    }

    .tree-enter,
    .tree-enter-from,
    .tree-leave-to {
      opacity: 0;
    }

    .tree-enter-active {
      animation: rightSlideIn 0.5s;
      transition: opacity 0.5s;
    }

    .tree-leave-active {
      animation: rightSlideOut 0.5s;
      transition: opacity 0.5s;
    }
  }
}
</style>
