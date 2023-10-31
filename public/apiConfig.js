const hostIP = window.realIP || '10.30.1.101' || '10.20.1.29' || '10.30.1.125'
// // //打包部署
// const hostIP = window.realIP || window.location.hostname;
const baseApiUrl = 'http://' + hostIP + ':21086/photovoltaic'
const hkVideoBaseUrl = 'http://' + hostIP + ':11086/alarm'

const WEBSOCKET_URL = baseApiUrl + '/ws/';
window.baseApiUrl = baseApiUrl;
window.hkVideoBaseUrl = hkVideoBaseUrl;
// window.isJikong = isJikong;  //是否集控，视频流地址替换
// window.isCorp = isCorp; //是否公司环境
window.WEBSOCKET_URL = WEBSOCKET_URL; //ws地址