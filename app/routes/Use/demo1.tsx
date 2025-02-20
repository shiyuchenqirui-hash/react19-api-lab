import React, { createContext, use } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

// 创建一个 Context
const MyContext = createContext<string>("default value");

// 父组件
const ParentComponent: React.FC = () => {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <Link to="/" className="back-button">
          返回首页
        </Link>
        <h2>React 19 use Hook Demo</h2>
      </div>

      <div className="demo-content">
        <MyContext.Provider value="Hello from Context!">
          <ChildComponent />
        </MyContext.Provider>
      </div>
    </div>
  );
};

// 子组件
const ChildComponent: React.FC = () => {
  // 使用 use 函数读取 Context 的值
  const contextValue = use(MyContext);

  return (
    <div className="context-value">
      Context Value: {contextValue}
    </div>
  );
};

export default ParentComponent;
