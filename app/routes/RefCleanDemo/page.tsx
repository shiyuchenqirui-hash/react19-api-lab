import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styles from './styles.module.css';

function ScrollTracker() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <Link to="/" className={styles.backButton}>返回首页</Link>
      <div className={styles.scrollContainer}
        ref={(ref) => {
          if (ref) {
            console.log("Scroll container mounted");

            // 绑定滚动事件监听器
            const handleScroll = () => {
              console.log("Scrolled to:", ref.scrollTop);
            };

            ref.addEventListener("scroll", handleScroll);

            // 返回清理函数
            return () => {
              console.log("Scroll container unmounted or ref changed");
              ref.removeEventListener("scroll", handleScroll);
            };
          }
        }}
      >
        <div className={styles.scrollContent}>
          <h2>滚动演示</h2>
          <p>这是一个滚动演示内容</p>
          <div className={styles.colorBlock}></div>
          <p>继续往下滚动查看更多内容</p>
          <div className={styles.colorBlock}></div>
          <p>已经到底部了</p>
        </div>
      </div>
    </div>
  );
}

export default ScrollTracker;
