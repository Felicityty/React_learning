import { List, Tabs } from "antd-mobile";
import { useEffect, useState } from "react";
import ActivityCard from "../../components/activity-card/activity-card";
import TabBarComponent from "../../components/tab-bar/tab-bar";
import useHandleScroll from "../../hooks/use-handle-scroll";
import { IActivity } from "../home/home.type";
import API from "./../../api";

export default function SignupActivity() {
  const [activitys, setActivitys] = useState<IActivity[]>([]);

  const [activityStatus, setActivityStatus] = useState("0");

  const [total, setTotal] = useState(0);

  const { filterParams, setFiltetrParams } = useHandleScroll(
    "activity-list",
    total
  );

  const signupActivity = async () => {
    const data = await API.signupActivity({ activityStatus, ...filterParams });
    setActivitys([...activitys, ...data.list]);
    setTotal(data.pagination.total);
  };

  useEffect(() => {
    signupActivity();
  }, [filterParams]);

  useEffect(() => {
    setActivitys([])
    /**
     * 顶栏过滤的时候，要把分页参数重置为1
     * 所以我们要暴露出setFiltetrParams 这个方法
     */
    setFiltetrParams({ ...filterParams, page: 1 });
  }, [activityStatus]);

  return (
    <div className="signupActivity">
      <Tabs onChange={(status) => setActivityStatus(status)}>
        <Tabs.Tab title="未开始" key="0"></Tabs.Tab>
        <Tabs.Tab title="进行中" key="1"></Tabs.Tab>
        <Tabs.Tab title="已结束" key="2"></Tabs.Tab>
      </Tabs>
      <div className="activity-list" id="activity-list">
        <List>
          {activitys.map((item, index) => (
            <List.Item key={index}>
              <ActivityCard item={item}></ActivityCard>
            </List.Item>
          ))}
        </List>
      </div>
      <TabBarComponent></TabBarComponent>
    </div>
  );
}
