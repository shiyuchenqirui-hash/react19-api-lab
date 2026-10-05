import React, { useState, useTransition } from "react";
import { requestFormReset } from "react-dom";
import { Link } from "react-router-dom";
import "./styles.css";

// 模拟异步更新用户信息的函数
async function updateUserInfo(formData: FormData): Promise<string | null> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const email = formData.get("email") as string;
      const username = formData.get("username") as string;

      // 模拟业务校验逻辑
      if (!email.includes("@")) {
        reject("邮箱格式不正确");
      } else if (username === "error") {
        reject("用户名已被占用");
      } else {
        resolve(`用户 ${username} 信息更新成功！`);
      }
    }, 1500);
  });
}

export default function FormActionsDemo() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    // TODO: 对照 return/await 请求的版本，验证 pending 是否覆盖完整异步阶段。
    // ! 请注意，startTransition并不是必须的
    startTransition(() => {
      updateUserInfo(formData)
        .then(setMessage)
        .catch(setError)
        .finally(() => {
          const form = document.querySelector("form");
          if (form) {
            requestFormReset(form);
          }
        });
    });

    // updateUserInfo(formData)
    //   .then(setMessage)
    //   .catch(setError)
    //   .finally(() => {
    //     const form = document.querySelector("form");
    //     if (form) {
    //       requestFormReset(form);
    //     }
    //   });
  };

  return (
    <div className="demo-container">
      <div className="demo-header">
        <Link to="/" className="back-button">
          返回首页
        </Link>
        <h2>{`React 19 <form> action attribute Demo`}</h2>
      </div>

      <div className="demo-content">
        <form action={handleSubmit}>
          <div className="form-group">
            <label>用户名：</label>
            <input
              type="text"
              name="username"
              placeholder="输入 'error' 触发错误"
              required
            />
          </div>

          <div className="form-group">
            <label>邮箱：</label>
            <input
              type="email"
              name="email"
              placeholder="输入无效邮箱触发错误"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={isPending ? "loading" : ""}
          >
            {isPending ? "提交中..." : "更新信息"}
          </button>

          {/* 状态反馈区域 */}
          {message && <div className="feedback success">{message}</div>}
          {error && <div className="feedback error">{error}</div>}
        </form>
      </div>
    </div>
  );
}
