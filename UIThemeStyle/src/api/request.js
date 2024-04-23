import axios, { Axios } from "axios"; // 引入axios
axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  //  baseURL: window.baseApi,
  // 超时
  timeout: 5000,
});

// request拦截器
service.interceptors.request.use(
  async (config) => {
    config.baseURL = config.tempUrl || window.baseApiUrl || config.baseURL;
    let Token = window.parent.sessionStorage.getItem("Authorization");
    console.log(Token);
    if (Token) {
      config.headers.Authorization = "Bearer " + Token;
    } else {
      if (!window.token) {
        Token = await window.getTokens();
        config.headers.Authorization = "Bearer " + Token;
      } else {
        config.headers.Authorization = "Bearer " + window.token;
      }
    }
    console.log("实例请求拦截器");

    let requestData = config.data;
    let NOTRMARRAY = [];
    if (requestData && requestData.NOTRMARRAY) {
      // 排除不需要去空的参数
      NOTRMARRAY = requestData.NOTRMARRAY;
    }
    // 去除为空的参数
    for (let key in requestData) {
      if (
        requestData[key] != undefined &&
        typeof requestData[key] !== "boolean"
      ) {
        if (
          (requestData[key] == -1 || requestData[key].length == 0) &&
          NOTRMARRAY.indexOf(key) == -1
        ) {
          delete requestData[key];
        }
        if (requestData[key] == "-2") {
          //"-2" 转换为空字符串
          requestData[key] = "";
        }
      }
    }
    config.data = requestData;
    // console.log(config.params)
    // get请求映射params参数
    if (config.method === "get" && config.params) {
      let url = config.url + "?";
      for (const propName of Object.keys(config.params)) {
        const value = config.params[propName];
        var part = encodeURIComponent(propName) + "=";
        if (value !== null && typeof value !== "undefined") {
          if (typeof value === "object") {
            for (const key of Object.keys(value)) {
              let params = propName + "[" + key + "]";
              var subPart = encodeURIComponent(params) + "=";
              url += subPart + encodeURIComponent(value[key]) + "&";
            }
          } else {
            url += part + encodeURIComponent(value) + "&";
          }
        }
      }
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res) => {

    return res.data;
  },
  (error) => {
    // let { message } = error;
    // if (message == "Network Error") {
    //   message = "后端接口连接异常";
    // } else if (message.includes("timeout")) {
    //   message = "系统接口请求超时";
    // } else if (message.includes("Request failed with status code")) {
    //   message = "系统接口" + message.substr(message.length - 3) + "异常";
    // }
    // Notification({
    //   title: "提示",
    //   message: message,
    //   type: "error",
    //   position: "bottom-right",
    // });
    return Promise.reject(error);
  }
);
export default service;