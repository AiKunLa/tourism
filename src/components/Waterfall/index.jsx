import styles from "./waterfall.module.css";
import { useEffect, useRef } from "react";
import ImageCard from "@/components/ImageCard";

export default function Waterfall(props) {
  const { images, loading, fetchMore } = props;
  const loader = useRef(null);

  

  useEffect(() => {
    // intersection observer
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchMore();
      }
    });
    if (loader.current) {
      observer.observe(loader.current);
    }
    // 组件卸载时，取消观察
    return () => {
      observer.disconnect();
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.column}>
        {images
          .filter((_, i) => i % 2 === 0)
          .map((item) => (
            <ImageCard key={item.id} item={item} />
          ))}
      </div>
      <div className={styles.column}>
        {images
          .filter((_, i) => i % 2 !== 0)
          .map((item) => (
            <ImageCard key={item.id} item={item} />
          ))}
      </div>
      <div ref={loader} className={styles.loader}>
        {loading && <div>加载中</div>}
      </div>
    </div>
  );
}

export { Waterfall };
