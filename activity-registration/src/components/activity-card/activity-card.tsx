import "./activity-card.scss";
import { IProps } from "./activity-card.type";
import getActivityName from "./../../utils/getActivityName";
import { useHistory } from 'dva'

export default function ActivityCard(props: IProps) {

  const history = useHistory()

  return (
    <div className="activityCard" onClick={() => history.push(`/activityDetail/${props.item.id}`)}>
      <img className="activityCard-img" src={props.item.activityImg} alt="" />
      <div className="activityCard-content">
        <div className="activityCard-title">{props.item.activityName}</div>
        <div className="activityCard-date">
          活动时间:{props.item.activityStartDate}-{props.item.activityEndDate}
        </div>
        <div className="activityCard-status">
          活动状态:{getActivityName(props.item.activityStatus)}
        </div>
        <div className="activityCard-info">
          <div className="activityCard-num">
            报名人数:{props.item.activityRegistered}
          </div>
          <div>活动人数上限:{props.item.activityMax}</div>
        </div>
      </div>
    </div>
  );
}
