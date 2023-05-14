export interface IRegisterParams {
  username: string
  password: string
  nickName: string
}

export interface IRegisterResponse {
  /**
   * 审核状态 0 未审核 1 审核通过 2 审核不通过
   */
  checking: string
  token: string
  id: string
}