import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


//
// import '@/assets/style/element-theme.scss';
import "@/assets/font/iconfont.css";
import axios, { Axios } from "axios";
// 引入axios
console.log(Axios)
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

// import '@/assets/style/element-theme.scss'
const app = createApp(App)
app.use(router)

app.use(ElementPlus)
app.mount('#app')
