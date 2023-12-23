import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import useLocalStorageState from "@/hooks/useLocalStorageState";
import useTitle from "@/hooks/useTitle";
// 防抖
import useDebounce from "@/hooks/useDebounce";
// 节流
import useThrottle from "@/hooks/useThrottle";
import useWebsocket from "@/hooks/useWebsocket";
import { Card, Button } from "antd";

interface Props {
  isVisible: boolean;
}

const View: React.FC<Props> = () => {
  /**
   * 缓存函数
   */
  const [localState, setLocalState] = useLocalStorageState("gouya", 1);
  const add = () => {
    setLocalState(localState + 1);
  };
  /**
   * 修改浏览器标题
   */
  const setTitle = useTitle("Default Title");
  const changeTitle = () => {
    setTitle("New Title");
  };

  /**
   * websocket
   *  wsData（获得的 socket 数据）、readyState（当前 socket 状态）、closeWebSocket （关闭 socket）、reconnect（重连）
   */
  // const { wsData, readyState, closeWebSocket, reconnect } = useWebsocket({
  //   url: 'ws://ip:端口', // 此参数为websocket地址
  //   verify // 此参数控制是否有权限，请求该方法
  // })
  // useEffect(() => {
  //   // 不在白名单人员之间不执行后续操作，不需要可以删除
  //   if (!verify) {
  //       return
  //   }

  //   // 接受到socket数据， 进行业务逻辑处理
  //   if (Object.keys(wsData).length !== 0) {
  //     console.log(wsData)
  //   }

  //   // 如果是已关闭且是当前页面自动重连
  //   if (readyState.key === 3 && isLocalPage) {
  //     reconnect()
  //   }
  //   // 不是当前页面 清空 webSocket 此处为优化代码使用的，不需要可以直接删除。
  //   if (!isLocalPage) {
  //     closeWebSocket()
  //   }
  // }, [wsData, readyState, isLocalPage, verify])

  /**
   * 节流函数
   */
  const [throttleText, setThrottleText] = useState("初始");
  const [textThrottleCls, setText] = useState("5");
  function handleClickJitter(type = "") {
    if (type == "debounce") {
      setText("已处理");
    } else {
      console.log("执行一次");
      setThrottleText(`${new Date().getSeconds()}`);
    }
  }
  const throttle = useThrottle(() => {
    handleClickJitter("throttle");
  }, 1000);

  /**
   * 防抖函数
   */
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const vModel = (evt: any) =>
    setParam({
      ...param,
      name: evt.target.value,
    });
  const debounceParam = useDebounce(param, 2000);
  useEffect(() => {
    console.log("打印执行", debounceParam);
  }, [debounceParam]);
  // 卡片数据
  const cardList = [
    {
      title: "缓存函数",
      isShowP: true,
      isShowB: true,
      isShowI: false,
      methods: add,
      content: localState,
      bName: "+1",
    },
    {
      title: "改标题",
      isShowP: false,
      isShowB: true,
      isShowI: false,
      methods: changeTitle,
      bName: "改标题",
    },
    {
      title: "防抖函数",
      isShowP: false,
      isShowB: false,
      isShowI: true,
      methods: vModel,
    },
    {
      title: "节流",
      isShowP: true,
      isShowB: true,
      isShowI: false,
      methods: throttle,
      content: throttleText,
      bName: "节流",
    },
  ];

  View.defaultProps = {
    isVisible: false,
  };
  return (
    <div className={styles.container}>
      {cardList.map((item, index) => (
        <Card
          key={index}
          title={item.title}
          bordered={false}
          style={{ width: 300, height: 250 }}
        >
          <p style={{ display: item.isShowP ? "block" : "none" }}>
            {item.content}
          </p>
          <Button
            type="primary"
            style={{ display: item.isShowB ? "block" : "none" }}
            onClick={item.methods}
          >
            {item.bName}
          </Button>
          <input
            style={{ display: item.isShowI ? "block" : "none" }}
            type="text"
            value={param.name}
            onChange={vModel}
          />
        </Card>
      ))}
    </div>
  );
};

export default View;
