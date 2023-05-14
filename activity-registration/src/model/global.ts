import { Model, routerRedux } from "dva";
import { IRegisterResponse } from "../pages/register/register.type";
import { IGlobalState, IPayload } from "./type";

const gloalModel = {
  namespace: "global",

  state: {
    token: "",
    checking: "0",
  } as IGlobalState,

  effects: {
    *setUserInfo({ payload }: Partial<IPayload<IRegisterResponse>>, { put }) {
      yield put({ type: "save", payload });

      if (payload?.checking !== "1") {
        // 跳转到审核页
        yield put(routerRedux.push("/checking"));
      } else {
        // 跳转到首页
        yield put(routerRedux.push("/home"));
      }
    },
  },

  reducers: {
    save(state, action: Partial<IPayload<IRegisterResponse>>) {
      return { ...state, ...action.payload };
    },
  },
} as Model;

export type gloalModelType = typeof gloalModel;



export default gloalModel;
