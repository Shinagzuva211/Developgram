import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "../Contact/Contact.css";
import { IoSend } from "react-icons/io5";
import { useContext } from "react";
import { ThemeContext } from "../../Context";

export default function ChatPage() {
  const { username } = useParams();
  const [message, setMessage] = useState("");
  const [send, setSend] = useState([{ id: 1, value: "" }]);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const {isDark} = useContext(ThemeContext)

  const handleSend = () => {
    if (message.trim() === "") return;

    setSend((prev) => [...prev, { id: Date.now(), value: message }]);
    setMessage("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [send]);

  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);


  return (
    <div style={{ padding: "20px" }}>
      <div className="chat-parent" >
        <h2 className={`chat-with ${isDark ? "light-text" : "dark-text"}`}>{username}</h2>

        <div className="send-value">
          {send.map((item) => (
            <div className="send-value2" key={item.id}>
              <p>{item.value}</p>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        <div className="send-content">
          <input
            ref={inputRef}
            className="chat-npt"
            type="text"
            placeholder="Xabar yozing..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />
          {message.trim() !== "" && (
            <button className="send-btn" onClick={handleSend}>
              <IoSend size={25} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


