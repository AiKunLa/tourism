import { memo } from "react";
import styles from "./loading.module.css";

const Loading = memo(function Loading() {
  return (
    <div className={styles.wrapper}>
      <div></div>
      <div></div>
    </div>
  );
});

export default Loading;
export { Loading };