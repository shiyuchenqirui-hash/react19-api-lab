import React, { Suspense, use } from "react";
import { Link } from "react-router-dom";
import "../FormAction/styles.css";

// 模拟一个异步函数，返回一个 Promise
const fetchData = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Hello from Promise!");
    }, 2000);
  });
};

// 子组件，使用 use 读取 Promise 的值
const DataComponent: React.FC<{ dataPromise: Promise<string> }> = ({
  dataPromise,
}) => {
  const data = use(dataPromise); // 使用 use 读取 Promise 的值
  return <div className="feedback success">{data}</div>;
};

// 父组件，使用 Suspense 处理加载状态
const App: React.FC = () => {
  const dataPromise = fetchData(); // 创建一个 Promise

  return (
    <div className="demo-container">
      <div className="demo-header">
        <Link to="/" className="back-button">
          返回首页
        </Link>
        <h2>React 19 use Hook Demo</h2>
      </div>

      <div className="demo-content">
        {/* ! 如果不用 Suspense，就需要手动处理加载状态和错误处理。 */}
        <Suspense
          fallback={
            <div className="feedback">Loading...(here is Suspense)</div>
          }
        >
          <DataComponent dataPromise={dataPromise} />
        </Suspense>
      </div>
    </div>
  );
};

export default App;
