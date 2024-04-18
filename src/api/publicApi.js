import request from './request'
import {getCurrentSite} from '@/utils/setSite';
const headers = {
  // curSite: '187299034078216192'
  curSite: ''
}

/* 获取站点列表 */
export function getStationPageApi({page,size}) {
    // 获取监控数据
    return request({
      // url: window.nsStation3d.baseApiUrl + '/home/getDataMornitor',
      url: 'http://10.20.2.231:21086' + `/station/list?page=${page}&size=${size}`,
      method: "GET",
      headers:{
        siteId:getCurrentSite(true),
        stationId:getCurrentSite(true),
      },
    });
  }

  /* 获取设备树筛选类型数据 */
export function TreeTypeApi(data) {
    return request({
      baseURL: window.nsPv_dashboard.dataConfigUrl,
      headers:{
        curSite:getCurrentSite(),
        siteId:getCurrentSite(),
        stationId:getCurrentSite()
      },
      url: `/product/device-type-tree`,
      method: 'post',
      data: JSON.stringify(data)
    })
  }

  /* 获取设备树数据 */
  export function TreeDataApi(data,site) {
    return request({
      baseURL: window.nsPv_dashboard.dataConfigUrl,
      headers:{
        curSite:getCurrentSite(),
        siteId:getCurrentSite(),
        stationId:getCurrentSite()
      },
      url: `/product/device-tree`,
      method: 'post',
      data: JSON.stringify(data)
    })
  }