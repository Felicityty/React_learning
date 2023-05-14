import { IRegisterParams, IRegisterResponse } from "../register/register.type";

export interface LoginParams
  extends Pick<IRegisterParams, "password" | "username"> {
  isback: boolean;
}
