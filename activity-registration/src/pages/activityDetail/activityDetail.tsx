import { Button, Form, Input, NavBar, Toast } from "antd-mobile";
import { useHistory, useParams } from "dva";
import { useEffect, useState } from "react";
import { IActivity } from "../home/home.type";
import API from "./../../api";
import getActivityName from "./../../utils/getActivityName";
import "./activityDetail.scss";
import { ISignup } from "./activityDetail.type";

export default function ActivityDetail() {
  const history = useHistory();

  const [activity, setActivity] = useState<Partial<IActivity>>({});

  const params = useParams<{ id: string }>();

  const [userId, setUserId] = useState("");

  useEffect(() => {
    getActivityDetail();
    getUserInfo();
  }, []);

  const getActivityDetail = async () => {
    const data = await API.getActivityDetail(params.id);
    setActivity(data);
  };

  const getUserInfo = async () => {
    const data = await API.getUserInfo();
    setUserId(data.id);
  };

  const goback = () => {
    history.goBack();
  };

  const activitySingnup = async (
    values: Omit<ISignup, "activityId" | "userId">
  ) => {
    await API.signup({ ...values, activityId: params.id, userId });
    Toast.show({
      content: '报名成功',
    })
    history.push('/signupActivity')
  };

  return (
    <div className="activityDetail">
      <NavBar onBack={goback}>活动详情</NavBar>
      <div className="activity-box">
        <div className="activity-content">
          <img className="activity-img" src={activity.activityImg} alt="" />
          <div className="activity-title">
            <div>{activity.activityName}</div>
            <div>{getActivityName(activity.activityStatus!)}</div>
          </div>
          <Form layout="horizontal" onFinish={activitySingnup}>
            <Form.Item
              rules={[{ required: true, message: "请输入姓名" }]}
              name="name"
              label="姓名"
            >
              <Input placeholder="请输入姓名"></Input>
            </Form.Item>
            <Form.Item
              rules={[
                {
                  pattern: /^1[3456789]\d{9}$/,
                  required: true,
                  message: "请输入姓名",
                },
              ]}
              name="phone"
              label="手机号"
            >
              <Input placeholder="请输入手机号"></Input>
            </Form.Item>
            <Form.Item name="wx" label="微信号">
              <Input placeholder="请输入微信号"></Input>
            </Form.Item>
            <Form.Item name="address" label="所在地址">
              <Input placeholder="请输入所在地址"></Input>
            </Form.Item>
            <Form.Item label="主办方">{activity.business}</Form.Item>
            <Button className="submit-btn" type="submit">
              我要报名
            </Button>
          </Form>
        </div>
      </div>

      <div className="activity-box">
        <div className="activity-content">{activity.activityDesc}</div>
      </div>
      <div className="empty"></div>
    </div>
  );
}
