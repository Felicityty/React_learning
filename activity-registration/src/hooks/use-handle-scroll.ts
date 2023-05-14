import { Toast } from "antd-mobile";
import { useEffect, useState } from "react";
import { BasePage } from "../types";
import { HandleScroll } from "./type";

/**
 *
 * @param cb 页面触底后触发的回调
 * @param domTagName 页面上dom的id
 */
export default function useHandleScroll(domTagName: string, total: number) {
  // 分页参数
  const [filterParams, setFiltetrParams] = useState(new BasePage());
  useEffect(() => {
    const dom = document.getElementById(domTagName);
    dom?.addEventListener("scroll", (e: any) => {
      const { scrollTop, clientHeight, scrollHeight } = e.target;
      if (scrollTop + clientHeight === scrollHeight) {
        /**
         * 这里就出现了react hooks的经典问题
         * 也就是 过期闭包的问题
         *  */
        if (filterParams.page * filterParams.size >= total && total !== 0) {
          Toast.show({
            content: "已滑到底~",
          });
          return;
        }
        setFiltetrParams({ ...filterParams, page: (filterParams.page += 1) });
      }
    });

    return () => {
      dom?.removeEventListener("scroll", () => {});
    };

    /**
     * 当total变化的时候 更新闭包
     * 要让闭包里面引用的数据是最新的
     */
  }, [total, filterParams]);

  return {
    filterParams,
    setFiltetrParams,
  };
}
