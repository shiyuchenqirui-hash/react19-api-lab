import { useState, useDeferredValue, useEffect } from "react";
import { Link } from "react-router-dom";
import SlowList from "./SlowList";
import "./styles.css";

export default function App() {
  const [text, setText] = useState("");
  const deferredText = useDeferredValue(text);

  //   ! 演示 state变化 和 deferredValue 变化引起的渲染次数不一致
  useEffect(() => {
    console.log("state text Change:", text);
  }, [text]);

  return (
    <div className="container">
      <Link to="/" className="back-button">
        返回首页
      </Link>
      <div className="input-container">
        <input
          className="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="请输入文字..."
        />
      </div>
      <SlowList text={deferredText} />
    </div>
  );
}
