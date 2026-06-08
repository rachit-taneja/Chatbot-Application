import React, { useState } from "react";
import axios from "axios";

function Bot() {
  const [messages, setMessages] = useState([]); // chat messages
  const [input, setInput] = useState("");       // input box
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);

    // Add user message first
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    try {
  const res = await axios.post(
  `${process.env.REACT_APP_API_URL}/bot/v1/message`,
  {
    text: input,
  }
);

      console.log("Backend response:", res.data); // 🟢 Debug log

      if (res.status === 200) {
        // Backend response: { user: "hi", bot: "Hello!" }
        const botReply = res.data.bot || "No reply from bot";
        setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Unexpected server response!" },
        ]);
      }
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response?.data || error.message
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `Server error! (${error.response?.status || "no status"})`,
        },
      ]);
    }

    setInput(""); // clear input box
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

 return (
  <div
    style={{
      display: "flex",
      height: "100vh",
      background: "#f3f4f6",
    }}
  >

    {/* LEFT SIDEBAR */}

    <div
      style={{
        width: "280px",
        background: "#1f2937",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        💬 Conversations
      </h2>

      <button
        style={{
          padding: "12px",
          borderRadius: "10px",
          border: "none",
          background: "#4CAF50",
          color: "white",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        + New Chat
      </button>

      <div style={{ overflowY: "auto" }}>
        <div
          style={{
            padding: "12px",
            borderRadius: "10px",
            background: "#374151",
            marginBottom: "10px",
            cursor: "pointer",
          }}
        >
          Hello chatbot
        </div>

        <div
          style={{
            padding: "12px",
            borderRadius: "10px",
            background: "#374151",
            marginBottom: "10px",
            cursor: "pointer",
          }}
        >
          Interview Questions
        </div>

        <div
          style={{
            padding: "12px",
            borderRadius: "10px",
            background: "#374151",
          }}
        >
          Placement Preparation
        </div>
      </div>
    </div>

    {/* CHAT SECTION */}

    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingRight: "80px",
      }}
    >
      <div
        style={{
          width: "420px",
          height: "85vh",
          background: "white",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
        }}
      >

      {/* Header */}

      <header
        style={{
          padding: "18px",
          background: "linear-gradient(135deg,#4CAF50,#2E7D32)",
          color: "white",
          textAlign: "center",
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        🤖 Rachit's AI ChatBot
      </header>

      {/* Chat Area */}

      <main
        style={{
          flex: 1,
          padding: "15px",
          overflowY: "auto",
          background: "#f5f7fb",
        }}
      >
        {messages.length === 0 && (
          <div
            style={{
              textAlign: "center",
              color: "#777",
              marginTop: "40px",
            }}
          >
            👋 Welcome! Ask me anything
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent:
                msg.sender === "user" ? "flex-end" : "flex-start",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                maxWidth: "75%",
                padding: "12px 16px",
                borderRadius: "18px",
                background:
                  msg.sender === "user"
                    ? "#4CAF50"
                    : "#ffffff",
                color:
                  msg.sender === "user"
                    ? "white"
                    : "black",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                wordBreak: "break-word",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ color: "#777", marginTop: "10px" }}>
            Bot is typing...
          </div>
        )}
      </main>

      {/* Footer */}

      <footer
        style={{
          display: "flex",
          padding: "15px",
          gap: "10px",
          background: "white",
          borderTop: "1px solid #eee",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: "30px",
            border: "1px solid #ddd",
            outline: "none",
            fontSize: "15px",
          }}
          disabled={loading}
        />

        <button
          onClick={handleSendMessage}
          disabled={loading}
          style={{
            width: "55px",
            height: "55px",
            borderRadius: "50%",
            border: "none",
            background: "#4CAF50",
            color: "white",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          {loading ? "..." : "➤"}
        </button>
      </footer>
    </div>
    </div>
    </div>
);
}

export default Bot;
