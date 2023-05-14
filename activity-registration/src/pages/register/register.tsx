import { Form, Input } from "antd-mobile";
import React from "react";
import { useHistory, useDispatch } from "dva";
import { IRegisterParams } from "./register.type";
import API from "../../api";
import { pick } from 'lodash'

export default function Register() {
  const history = useHistory();

  const dispatch = useDispatch()

  const [form] = Form.useForm<IRegisterParams>();

  const register = async () => {
    // 获取表单字段
    const data = form.getFieldsValue();

    // 调用注册接口
    const res = await API.register(data)

    dispatch({
      type: "global/setUserInfo",
      payload: {
        ...pick(res, ['checking', 'token'])
      }
    })
    
  };

  return (
    <div className="login">
      <div className="login-content">
        <h1>注册</h1>
        <Form layout="horizontal" form={form}>
          <Form.Item label="昵称" name="nickName">
            <Input placeholder="请输入昵称"></Input>
          </Form.Item>
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
            <Input type="password" placeholder="请输入密码"></Input>
          </Form.Item>
        </Form>
        <div className="submit-login" onClick={() => register()}>
          注册
        </div>
        <div onClick={() => history.push("/login")}>去登录</div>
      </div>
    </div>
  );
}
