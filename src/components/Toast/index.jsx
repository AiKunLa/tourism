import styles from "./toast.module.css";
import { useState } from "react";
import { toastevents } from "./toastController";
import { useEffect } from "react";

export default function Toast(props) {
  const [visible, setVisible] = useState(false);

  const [data, setData] = useState({
    user: 0,
    bell: 0,
    mail: 0,
  });

  useEffect(() => {
    const handleShow = (e) => {
      setData(e);
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 2000);
    };

    // 订阅事件 调用回调函数
    toastevents.on("show", handleShow);
    // 组件卸载时 需要取消订阅
    return () => {
      console.log("///////////////");
      toastevents.off("show", handleShow);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.toastWrapper}>
      <div className={styles.toastItem}>👤 {data.user}</div>
      <div className={styles.toastItem}>🔔 {data.bell}</div>
      <div className={styles.toastItem}>✉ {data.mail}</div>
      <div className={styles.toastArrow}></div>
    </div>
  );
}

export { Toast };
