import { Badge, TabBar } from "antd-mobile";
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons";
import { useHistory } from "dva";
import './tab-bar.scss'

export default function TabBarComponent() {
  const history = useHistory();

  const tabs = [
    {
      key: "/home",
      title: "首页",
      icon: <AppOutline />,
    },
    {
      key: "/signupActivity",
      title: "已报名活动",
      icon: <UnorderedListOutline />,
    },
  ];

  const linkPage = (key: string) => {
    history.push(key);
  };

  return (
    <div className="tab">
      <TabBar onChange={linkPage} defaultActiveKey={history.location.pathname}>
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  );
}
