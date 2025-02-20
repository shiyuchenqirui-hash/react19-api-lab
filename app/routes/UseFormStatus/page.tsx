import React from "react";
import { useFormStatus } from "react-dom";
import { Link } from "react-router-dom";
import "../FormAction/styles.css";

// 模拟异步提交函数
async function submitFormData(formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // 模拟 2 秒延迟
  const name = formData.get("name") as string;
  if (!name) {
    throw new Error("Name is required");
  }
  return { success: true };
}

// 提交按钮组件
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={pending ? "loading" : ""}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}

// 主表单组件
export default function FormDemo() {
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    try {
      const result = await submitFormData(formData);
      if (result.success) {
        setMessage("Form submitted successfully!");
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
      setMessage(null);
    }
  };

  return (
    <div className="demo-container">
      <div className="demo-header">
        <Link to="/" className="back-button">
          返回首页
        </Link>
        <h2>React 19 useFormStatus Demo</h2>
      </div>

      <div className="demo-content">
        <form action={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <SubmitButton />
          </div>
        </form>
        {message && <div className="feedback success">{message}</div>}
        {error && <div className="feedback error">{error}</div>}
      </div>
    </div>
  );
}
