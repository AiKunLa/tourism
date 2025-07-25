import { useTitle } from "@/hooks/useTitle";
import { useState, useEffect } from "react";
import { kimiChat, deepseekChat } from "@/llm/chat";
import styles from "./trip.module.css";
import { Input, Button, Loading, Toast } from "react-vant";
import { ChatO, UserO } from "@react-vant/icons";

export default function Trip() {
  useTitle("智能旅游客服");
  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 2,
      content: "hello~",
      role: "assistant",
    },
    {
      id: 1,
      content: "你好",
      role: "user",
    },
  ]);
  const handleChat = async () => {
    if (text.trim() === "") {
      Toast.info({ message: "内容不能为空" });
    }
    setIsSending(true);
    setText("");

    setMessages((pre) => {
      return [
        ...pre,
        {
          role: "user",
          content: text,
        },
      ];
    });
    const newMessage = await kimiChat([{ role: "user", content: text }]);
    setMessages((pre) => {
      return [...pre, newMessage];
    });
    
    console.log(newMessage);
    setIsSending(false);
  };

  return (
    <div className="flex flex-col h-all">
      <div className={`flex-1 ${styles.chatArea}`}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.role === "user" ? styles.messageRight : styles.messageLeft
            }
          >
            {msg.role === "assistant" ? <ChatO /> : <UserO />}
            {msg.content}
          </div>
        ))}
      </div>
      <div className={`flex ${styles.inputArea}`}>
        <Input
          value={text}
          onChange={(value) => setText(value)}
          placeholder="请输入"
          className={`flex-1 ${styles.input}`}
        />
        <Button type="primary" onClick={handleChat} disabled={isSending}>
          发送
        </Button>
      </div>
      {isSending && (
        <div className="fixed-loading">
          {" "}
          <Loading type="ball" />
        </div>
      )}
    </div>
  );
}
export { Trip };
