import { Link } from "react-router-dom";
import { useState, useTransition } from "react";
import { useActionState } from "react";
import "./styles.css";

// 定义用户信息更新结果的类型
interface UpdateResult {
  success: boolean;
  message: string;
}

// 模拟异步更新用户信息的函数
async function updateUserInfo(formData: FormData): Promise<UpdateResult> {
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
        resolve({
          success: true,
          message: `用户 ${username} 信息更新成功！`,
        });
      }
    }, 1500);
  });
}

export default function UseActionStateWithTransitionPage() {
  const [isPending, startTransition] = useTransition();
  const [state, submitAction, isActionPending] = useActionState<
    UpdateResult | null,
    FormData
  >(
    async (previousState, formData) => {
      try {
        const result = await updateUserInfo(formData);
        return result; // 成功时返回结果
      } catch (error) {
        return { success: false, message: error as string }; // 错误时返回错误信息
      }
    },
    null // 初始状态
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    startTransition(() => {
      submitAction(new FormData(event.target as HTMLFormElement));
    });
  };

  return (
    <div className="demo-container">
      <div className="demo-header">
        <Link to="/" className="back-button">
          Back to Home
        </Link>
        <h2>useActionState with startTransition Demo</h2>
      </div>

      <div className="demo-content">
        <form onSubmit={handleSubmit}>
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
            disabled={isActionPending}
            className={isActionPending ? "loading" : ""}
          >
            {isActionPending ? "提交中..." : "更新信息"}
          </button>

          {/* 状态反馈区域 */}
          {state && (
            <div className={`feedback ${state.success ? "success" : "error"}`}>
              {state.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
