export interface IActivity {
  id: string;
  // 活动名
  activityName: string;
  // 活动状态 0 未开始 1进行中 2已结束
  activityStatus: string;
  // 活动人数上限
  activityMax: string;
  // 报名人数
  activityRegistered: string;
  // 活动开始时间
  activityStartDate: string;
  // 活动结束时间
  activityEndDate: string;
  // 活动封面
  activityImg: string;
  activityDesc: string
  business: string
}
