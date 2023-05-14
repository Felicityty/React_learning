import { Toast } from "antd-mobile";
import axios, { AxiosResponse } from "axios";
import { IBaseRespose } from "../types";

axios.interceptors.request.use((config) => {
  // 我们每次请求前端 都要在header里面配置token
  const globalState = JSON.parse(localStorage.getItem("global") || "{}");
  if (config.headers) {
    config.headers["Authorization"] = globalState.token;
  }

  return config;
});

axios.interceptors.response.use(
  (response: AxiosResponse<IBaseRespose<any>>) => {
    // 接收到数据后，判断一下接口是否成功
    if (response.data.code !== 1000) {
      // 当前的请求出现错误，需要提示用户
      Toast.show({
        content: response.data.message,
      });

      // 抛出错误，阻塞后续代码的运行
      throw new Error(response.data.message);
    }

    return response.data.data;
  }
);

export default axios;
