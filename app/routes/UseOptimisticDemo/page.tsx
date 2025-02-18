import { useOptimistic, useState, useRef } from "react";
import "./styles.css";

// 模拟异步消息发送函数
async function deliverMessage(
  message: string,
  switchFlag: boolean = true
): Promise<string> {
  if (switchFlag) {
    return await new Promise((resolve) =>
      setTimeout(() => resolve(message), 1000)
    );
  } else {
    return await new Promise((_, reject) =>
      setTimeout(() => reject("error"), 1000)
    );
  }
}

// 定义消息的数据结构
interface Message {
  text: string;
  sending?: boolean; // 可选字段，表示消息是否正在发送
}

export default function UseOptimisticDemo() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { text: "你好，在这儿！", sending: false },
  ]);

  const [optimisticMessages, addOptimisticMessage] = useOptimistic<
    Message[],
    string
  >(messages, (state, optimisticMessage: string) => [
    ...state,
    {
      text: optimisticMessage,
      sending: true,
    },
  ]);

  async function handleSendMessage(formData: FormData): Promise<void> {
    addOptimisticMessage(formData.get("message") as string);

    if (formRef.current) {
      formRef.current.reset();
    }

    try {
      const sentMessage = await deliverMessage(
        formData.get("message") as string
      );
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: sentMessage, sending: false },
      ]);
    } catch (error) {
      console.error("消息发送失败:", error);
      // 如果发送失败，可以选择删除乐观更新的消息
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.sending !== true)
      );
    }
  }

  return (
    <div className="chat-container">
      <div className="messages-container">
        {optimisticMessages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sending ? "sending" : ""}`}
          >
            {message.text}
            {!!message.sending && (
              <span className="sending-indicator">（发送中……）</span>
            )}
          </div>
        ))}
      </div>
      <form action={handleSendMessage} ref={formRef} className="chat-form">
        <input
          type="text"
          name="message"
          placeholder="输入消息..."
          className="chat-input"
        />
        <button type="submit" className="send-button">
          发送
        </button>
      </form>
    </div>
  );
}
