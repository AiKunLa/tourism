import useTitle from "@/hooks/useTitle";
import {
  ServiceO,
  FriendsO,
  StarO,
  SettingO,
  UserCircleO,
  AddO,
  CartO,
  ChatO,
  FireO,
  LikeO,
  Search,
  HomeO,
  UserO,
} from "@react-vant/icons";
import { useState } from "react";
import {
  Image,
  Cell,
  CellGroup,
  ActionSheet,
  Popup,
  Loading,
} from "react-vant";
import styles from "./account.module.css";

export default function Account() {
  useTitle("我的账户");
  const [userInfo, setUserInfo] = useState({
    nickname: "哇咔咔",
    slogan: "桀桀桀",
    level: "5级",
    avatar:
      "https://s1.aigei.com/src/img/png/33/33e68b870d17445cbed40d3982654896.png?imageMogr2/auto-orient/thumbnail/!282x282r/gravity/Center/crop/282x282/quality/85/%7CimageView2/2/w/282&e=2051020800&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:M5zk3OdjwrRHVKh53XlvkH3w4Xs=",
  });
  const [showActionSheet, setShowActionSheet] = useState(false);

  const actions = [
    {
      name: "AI生成头像",
      color: "#ee0a24",
      type: 1,
    },
    {
      name: "上传头像",
      color: "#123123",
      type: 2,
    },
  ];

  const gridData = [
    { icon: <AddO />, text: "添加" },
    { icon: <CartO />, text: "购物车" },
    { icon: <ChatO />, text: "聊天" },
    { icon: <FireO />, text: "热门" },
    { icon: <LikeO />, text: "喜欢" },
    { icon: <StarO />, text: "收藏" },
    { icon: <Search />, text: "搜索" },
    { icon: <HomeO />, text: "首页" },
    { icon: <UserO />, text: "我的" },
  ];

  const handleAction = async (e) => {
    if (e.type === 1) {
      const text = `昵称:${userInfo.nickname} slogan:${userInfo.slogan}`;
      const newAvatar = await generateAvatar();
    }
    if (e.type === 2) {
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          round
          width="64px"
          height="64px"
          src={userInfo.avatar}
          style={{ cursor: "pointer" }}
          onClick={() => setShowActionSheet(true)}
        ></Image>
        <div className="ml4">
          <div className={styles.nickname}>昵称：{userInfo.nickname}</div>
          <div className={styles.level}>等级：{userInfo.level}</div>
          <div className={styles.slogan}>签名：{userInfo.slogan}</div>
        </div>
      </div>

      <div className="mt3">
        <CellGroup inset className="mt2">
          <Cell title="服务" icon={<ServiceO />} isLink />
        </CellGroup>
        <CellGroup inset className="mt2">
          <Cell title="收藏" icon={<StarO />} isLink />
          <Cell title="朋友圈" icon={<FriendsO />} isLink />
        </CellGroup>

        <CellGroup inset className="mt2">
          <Cell title="设置" icon={<SettingO />} isLink />
        </CellGroup>
      </div>
      <ActionSheet
        visible={showActionSheet}
        actions={actions}
        onCancel={() => setShowActionSheet(false)}
        onSelect={(e) => handleAction(e)}
        cancelText="取消"
      ></ActionSheet>
      <div className={styles.gridContainer}>
        {gridData.map((item, index) => (
          <div className={styles.gridItem} key={index}>
            <div className={styles.icon}>{item.icon}</div>
            <div className={styles.text}>{item.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
export { Account };
