import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Tabbar } from "react-vant";
import { HomeO, Search, FriendsO, SettingO, UserO } from "@react-vant/icons";
import { Loading } from "@/components/Loading";

//菜单栏配置
const tabs = [
  { icon: <HomeO />, title: "首页", path: "/home" },
  { icon: <Search />, title: "特惠专区", path: "/discount" },
  { icon: <FriendsO />, title: "我的收藏", path: "/collection" },
  { icon: <SettingO />, title: "行程", path: "/trip" },
  { icon: <UserO />, title: "我的账户", path: "/account" },
];

export default function MainLayout() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // 监听路由变化 ，路由变化时，根据路由路径，设置当前激活的tabbar
  // 当用户从链接直接进入页面时，根据链接路径，激活对应的tabbar

  // useEffect(() => {
  //   const index = tabs.findIndex((tab) =>
  //     location.pathname.startsWith(tab.path)
  //   );
  //   setActive(index);
  // }, []);

  useEffect(() => {
    // 处理根路径情况，默认匹配首页
    const path = location.pathname === "/" ? "/home" : location.pathname;
    const index = tabs.findIndex((tab) => path.startsWith(tab.path));
    setActive(index > -1 ? index : 0); // 确保默认选中首页
  }, [location.pathname]); // 添加依赖项

  return (
    <div className="flex flex-col h-screen" style={{ paddingBottom: "50px" }}>
      <div className="flex-1">

        <Outlet />
      </div>
      <Tabbar
        value={active}
        onChange={(index) => {
          setActive(index);
          navigate(tabs[index].path); // 在此处切换路由
        }}
      >
        {tabs.map((tab, index) => (
          // 每个tabbar.item都需要一个key  icon 是图标

          <Tabbar.Item key={index} icon={tab.icon}>
            {tab.title}
          </Tabbar.Item>
        ))}
      </Tabbar>
    </div>
  );
}
export { MainLayout };
