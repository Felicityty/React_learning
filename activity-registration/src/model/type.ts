import { AnyAction } from "redux";

export type IPayload<T extends Partial<AnyAction>> = {
  payload: T;
};

export interface IGlobalState {
  token: string
  checking: string
}