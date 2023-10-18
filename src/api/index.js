import request from './request'
const headers = {
  // curSite: '187299034078216192'
  curSite: ''
}
const realUrl = window.baseApiUrl || (window.__WUJIE_RAW_WINDOW__?.baseApiUrl);
export function tv_device_list(type) {
  //查询温振实时页面的指定类型生产设备
  return request({
    url: realUrl + `/device/list/type?type=${type}`,
    method: 'get',
    headers: headers
  })
}
export function tv_device_statics_time(data) {
  //查询温振实时的异常事件段
  return request({
    url: realUrl + `/statics/vibration/time`,
    method: 'post',
    headers: headers,
    data: JSON.stringify(data)
  })
}
export function getCoalConfig(data) {
  // 获取落煤筒配置数据
  return request({
    url: realUrl + '/coal-config',
    method: "GET",
    headers: headers,
    params: data,
  });
}