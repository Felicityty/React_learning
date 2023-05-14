import { ISignup } from "../pages/activityDetail/activityDetail.type";
import { IActivity } from "../pages/home/home.type";
import { LoginParams } from "../pages/login/login.type";
import {
  IRegisterParams,
  IRegisterResponse,
} from "../pages/register/register.type";
import { ISignupParams } from "../pages/signupActivity/signupActivity.type";
import { BasePage, IBaseList, IBaseRespose } from "../types";
import request from "./../utils/request";

const API = {
  register(data: IRegisterParams) {
    return request.post<IRegisterParams, IRegisterResponse>(
      "/admin/base/open/register",
      data
    );
  },

  login(data: LoginParams) {
    return request.post<LoginParams, IRegisterResponse>(
      "/admin/base/open/login",
      data
    );
  },

  getUserInfo() {
    return request.post<{}, IRegisterResponse>("/admin/base/comm/person");
  },

  getBanners(data: BasePage) {
    return request.post<BasePage, IBaseList<{ img: string }>>(
      "/admin/base/banner/page",
      data
    );
  },

  getActivitys(data: BasePage) {
    return request.post<BasePage, IBaseList<IActivity>>(
      "/admin/base/activityManage/page",
      data
    );
  },

  getActivityDetail(id: string) {
    return request.get<string, IActivity>(
      `/admin/base/activityManage/info?id=${id}`
    );
  },

  signup(data: ISignup) {
    return request.post("/app/base/activitySignup/add", data);
  },

  signupActivity(data: ISignupParams) {
    return request.post<ISignupParams, IBaseList<IActivity>>(
      "/app/base/activitySignup/page",
      data
    );
  },
};

export default API;
