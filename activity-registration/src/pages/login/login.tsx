import { Form, Input } from "antd-mobile";
import React from "react";
import "./login.scss";
import { useHistory, useDispatch } from "dva";
import API from "../../api";
import { LoginParams } from "./login.type";
import { pick } from "lodash";

export default function Login() {
  const history = useHistory();

  const dispatch = useDispatch();

  const [form] = Form.useForm<Omit<LoginParams, "isback">>();

  const login = async () => {
    const data = form.getFieldsValue();

    const res = await API.login({ ...data, isback: false });

    dispatch({
      type: "global/setUserInfo",
      payload: {
        ...pick(res, ["checking", "token"]),
      },
    });
  };

  return (
    <div className="login">
      <div className="login-content">
        <h1>千锋线下活动平台</h1>
        <Form layout="horizontal" form={form}>
          <Form.Item
            label="手机号"
            rules={[
              {
                required: true,
                pattern: /^1[3456789]\d{9}$/,
                message: "请输入手机号",
              },
            ]}
            name="username"
          >
            <Input placeholder="请输入手机号"></Input>
          </Form.Item>
          <Form.Item
            label="密码"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
            name="password"
          >
            <Input type='password' placeholder="请输入密码"></Input>
          </Form.Item>
        </Form>
        <div className="submit-login" onClick={login}>
          登录
        </div>
        <div onClick={() => history.push("/register")}>去注册</div>
      </div>
    </div>
  );
}
