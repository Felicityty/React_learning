import { Button, ErrorBlock } from "antd-mobile";
import { useSelector, useHistory, useDispatch } from "dva";
import { gloalModelType } from "../../model/global";
import { IGlobalState } from "../../model/type";
import "./checking.scss";
import API from "./../../api";
import { pick } from "lodash";

export default function Checking() {
  const phone = "18511185763";

  const history = useHistory();

  const dispatch = useDispatch();

  const global = useSelector<{ global: IGlobalState }, IGlobalState>(
    ({ global }) => global
  );

  const callAdmin = () => {
    window.location.href = `tel:${phone}`
  };

  const reloadStatus = async () => {
    const data = await API.getUserInfo();
    dispatch({
      type: "global/setUserInfo",
      payload: {
        ...pick(data, ["checking"]),
      },
    });
  };

  return (
    <div className="checking">
      {global.checking === "2" && (
        <ErrorBlock
          description="请稍后再试"
          title="审核不通过"
          status="default"
        />
      )}
      {global.checking === "0" && (
        <ErrorBlock description="请稍后再试" title="账号审核中" status="busy" />
      )}
      {global.checking === "2" ? (
        <>
          <Button color="warning" onClick={callAdmin}>
            请联系李老师{phone}
          </Button>
          <br />
          <Button color="success" onClick={() => history.push("/login")}>
            重新登录
          </Button>
        </>
      ) : (
        <Button color="warning" onClick={() => reloadStatus()}>
          刷新
        </Button>
      )}
    </div>
  );
}
