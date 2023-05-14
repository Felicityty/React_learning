import dva, { DvaOption } from "dva";

import router from "./router";
import './index.css'

import gloalModel from "./model/global";
import { IGlobalState } from "./model/type";

const initialGlobalState = () => {
  const globalState = JSON.parse(localStorage.getItem("global") || "{}");

  /**
   * 如果在model的state里面再添加属性
   * 那么也要放进来。并且遵循后进先出的原则
   * 有同样的属性。本地存储的优先级最高
   */
  return {
    ...gloalModel.state,
    ...globalState,
  };
};

const app = dva({
  /**
   * 监听state的变化，每次变化都往localStorage存一下
   */
  onStateChange(state: { global: IGlobalState }) {
    localStorage.setItem("global", JSON.stringify(state.global));
  },

  initialState: {
    global: initialGlobalState(),
  },
} as unknown as DvaOption);

// 挂载路由
app.router(router);

// 挂载model
app.model(gloalModel);

app.start("#root");
