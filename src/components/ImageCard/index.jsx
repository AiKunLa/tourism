import { useEffect, useRef } from "react";
import styles from "./imageCard.module.css";

export default function ImageCard(props) {
  const { item } = props;
  const imgRef = useRef(null);
  useEffect(() => {
    const observe = new IntersectionObserver(([entry], observer) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        // 预加载 避免图片加载完成后，切换图片时出现闪烁
        const loadImg = new Image();
        loadImg.src = item.url;

        // 加载完成后，将加载好的图片赋值给img
        loadImg.onload = () => {
          img.src = loadImg.src;
        };
        // 图片加载失败处理
        loadImg.onerror = () => {
          img.src = "/loading.gif";
        };
        // 图片加载完成后，停止观察
        observer.unobserve(img);
      }
    });
    if (imgRef.current) {
      observe.observe(imgRef.current);
    }
  }, []);

  return (
    <div className={styles.card} style={{height:item.height}}>
      <img
        ref={imgRef}
        src="/loading.gif"
        alt={item.title}
        className={styles.img}
      />
    </div>
  );
}

export { ImageCard };
