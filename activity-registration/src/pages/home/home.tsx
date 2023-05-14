import { List, Swiper } from "antd-mobile";
import { useEffect, useState } from "react";
import { BasePage } from "../../types";
import API from "./../../api";
import "./home.scss";
import ActivityCard from "../../components/activity-card/activity-card";
import TabBarComponent from "../../components/tab-bar/tab-bar";
import { IActivity } from "./home.type";
import useHandleScroll from "../../hooks/use-handle-scroll";

export default function Home() {
  const [banners, setBanners] = useState<{ img: string }[]>([]);

  const [total, setTotal] = useState(0);

  const [activitys, setActivitys] = useState<IActivity[]>([]);

  const { filterParams } = useHandleScroll("activity-list", total);

  useEffect(() => {
    getBanners();
  }, []);

  useEffect(() => {
    getActivitys();
  }, [filterParams]);

  const getActivitys = async () => {
    const data = await API.getActivitys(filterParams);
    setTotal(data.pagination.total);
    setActivitys([...activitys, ...data.list]);
  };

  const getBanners = async () => {
    const { list } = await API.getBanners(new BasePage());
    setBanners(list);
  };

  return (
    <div className="home">
      <Swiper autoplay>
        {banners.map((item, index) => (
          <Swiper.Item key={index}>
            <div className="swiper-img">
              <img src={item.img} alt="" />
            </div>
          </Swiper.Item>
        ))}
      </Swiper>
      <div className="activity-box">
        <div>热门活动</div>
        <div className="activity-list" id="activity-list">
          <List>
            {activitys.map((item, index) => (
              <List.Item key={index}>
                <ActivityCard item={item}></ActivityCard>
              </List.Item>
            ))}
          </List>
        </div>
      </div>
      <div className="empty"></div>
      <TabBarComponent></TabBarComponent>
    </div>
  );
}
