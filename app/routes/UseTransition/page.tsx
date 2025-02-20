import React, { useState, useTransition } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function UseTransitionDemo() {
  const [inputValue, setInputValue] = useState<string>("");
  const [list, setList] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleAddItem = (): void => {
    if (!inputValue.trim()) return;
    setInputValue("");

    startTransition(async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          setList((prevList) => [...prevList, inputValue]);
          resolve(void 0);
        }, 3000);
      });
    });
  };

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backButton}>返回首页</Link>
      <h1 className={styles.title}>useTransition 示例</h1>

      <div className={styles.inputGroup}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="请输入内容..."
          className={styles.input}
        />
        <button
          onClick={handleAddItem}
          disabled={isPending}
          className={`${styles.button} ${
            isPending ? styles.buttonPending : ""
          }`}
        >
          {isPending ? "添加中..." : "添加"}
        </button>
      </div>

      {isPending && <div className={styles.loadingText}>正在处理...</div>}

      <ul className={styles.list}>
        {list.map((item, index) => (
          <li key={index} className={styles.listItem}>
            {item}
          </li>
        ))}
      </ul>

      {list.length === 0 && <div className={styles.emptyText}>暂无数据</div>}
    </div>
  );
}
