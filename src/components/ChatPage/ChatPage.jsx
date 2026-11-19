import { useEffect, useMemo, useRef, useState } from "react";
import { IoArrowBack, IoSend } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import "../Contact/Contact.css";

const readMessages = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem("chatMessages") || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
};

const formatTime = (timestamp) =>
  new Date(timestamp).toLocaleTimeString("uz-UZ", {
    hour: "2-digit",
    minute: "2-digit",
  });

export default function ChatPage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState(readMessages);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const messages = useMemo(
    () => allMessages[username] ?? [],
    [allMessages, username]
  );

  const handleSend = () => {
    const value = message.trim();
    if (!value) return;

    setAllMessages((prev) => ({
      ...prev,
      [username]: [...(prev[username] ?? []), { id: Date.now(), value }],
    }));
    setMessage("");
    inputRef.current?.focus();
  };

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(allMessages));
  }, [allMessages]);

  useEffect(() => {
    setMessage("");
  }, [username]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      const target = e.target;
      const isTyping =
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if (e.key === "/" && !isTyping) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className="chat-window">
      <header className="chat-window__header">
        <button
          type="button"
          className="chat-window__back"
          onClick={() => navigate("/contact/")}
          aria-label="Kontaktlarga qaytish"
        >
          <IoArrowBack size={20} />
        </button>
        <span className="avatar contact-item__avatar">
          {username?.charAt(0).toUpperCase()}
        </span>
        <div className="chat-window__person">
          <strong>{username}</strong>
          <small>Faol</small>
        </div>
      </header>

      <div className="chat-window__messages">
        {messages.length === 0 ? (
          <div className="state-box">
            <span className="avatar chat-empty__icon">
              <IoSend size={26} />
            </span>
            <h3>{username} bilan suhbat</h3>
            <p>Birinchi xabarni yuborib suhbatni boshlang.</p>
          </div>
        ) : (
          messages.map((item) => (
            <div className="bubble" key={item.id}>
              <p>{item.value}</p>
              <time dateTime={new Date(item.id).toISOString()}>
                {formatTime(item.id)}
              </time>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        className="chat-window__composer"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <input
          ref={inputRef}
          className="input"
          type="text"
          placeholder="Xabar yozing...  ( / tugmasi bilan tez kirish )"
          aria-label="Xabar"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          autoComplete="off"
        />
        <button
          type="submit"
          className="btn--icon send-btn"
          disabled={!message.trim()}
          aria-label="Xabarni yuborish"
        >
          <IoSend size={19} />
        </button>
      </form>
    </div>
  );
}
