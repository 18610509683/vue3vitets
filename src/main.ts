import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import bus from '@/buses/index'

import 'keystar-ui/dist/style.css';
// import keystarUI from 'keystar-ui'

// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "@/assets/css/font/iconfont.css";
import "@/assets/css/base.hh.less";
import "@/assets/css/variable.less";
import "@/assets/css/elestyle.less";
import "@/assets/css/common.less";
import "@/assets/css/base.scss";
import axios, { Axios } from "axios"; // 引入axios



// // import log from 'loglevel';
// // log.setLevel(1)
// // console.log(log)

// // // window.console.log = log.trace
// // window.console.log = log.info
// // window.console.debug = log.debug
// // window.console.info = log.info
// // window.console.warn = log.warn
// // window.console.error = log.error

// // const msg = "我是测试内容"
// // console.log(import.meta.env.MODE)
// // //import.meta.env.MODE development
// // console.log(msg)
// // console.debug(msg)
// // console.info(msg)
// // console.warn(msg)
// // console.error(msg)
// // console.log(Axios)

// //说明：替代系统本身的log函数，可以附带log命令所在行数信息
// function getStackTrace() {
//     var obj = {};
//     Error.captureStackTrace(obj, getStackTrace);
//     return obj.stack;   
// };
// function log(data) {	
//     var stack = getStackTrace() 
//     //console.log(stack)    //有兴趣可以用这行命令查看下完整显示的信息
//     stack = stack.match(/js:\d+/gm)[1]  //stack中的第二行是正确信息
//     stack = stack.slice(stack.indexOf("js:")+3,stack.length) 
//     console.log("<" + "第" + stack + "行> " + data)
// }
 
// //一下为函数演示部分
// log("输出1")
// fun1()
 
 
// function fun1(){
//     fun2()
// }
// function fun2(){
//     log("输出2")
// }

const GetToken = (data: string) => {
  return axios({
    // baseURL:"http://192.168.5.12/api",
    baseURL: window.baseApiUrl,
    url: `/center/develop/login?devSecret=${data}`,
    method: "get"
  });
};
var getting = false; //获取token中
window.getTokens = () => {
  if (getting) return;
  console.log("获取token中..........");
  getting = true;

  return new Promise((resolve, reject) => {
    GetToken("5EQnhBZDd").then((res) => {
      console.log(res);
      if (res.data?.data?.token) {
        window.token = res.data.data.token;
        console.log(window.token);
        getting = false;
        resolve(window.token);
      } else {
        getting = false;
        reject(false);
      }
    });
  });
}
// window.getTokens()


const app = createApp(App);
// app.use(keystarUI)
// 全局挂载
app.config.globalProperties.$bus = bus;

import { Close }  from "@element-plus/icons-vue";
app.component('Close', Close)

app.use(router)
app.mount("#app");
