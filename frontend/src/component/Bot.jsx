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
      const res = await axios.post("http://localhost:4002/bot/v1/message", {
        text: input,
      });

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
      className="chat-container"
      style={{
        maxWidth: "500px",
        margin: "20px auto",
        border: "1px solid #ccc",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        height: "80vh",
      }}
    >
      {/* Navbar Header */}
      <header
        style={{
          padding: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          textAlign: "center",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
      >
        ChatBot
      </header>

      {/* Chat Area */}
      <main
        style={{
          flex: 1,
          padding: "10px",
          overflowY: "auto",
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              margin: "5px 0",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "20px",
                backgroundColor:
                  msg.sender === "user" ? "#DCF8C6" : "#ECECEC",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </main>

      {/* Input & Footer */}
      <footer
        style={{
          display: "flex",
          padding: "10px",
          borderTop: "1px solid #ccc",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "20px",
            border: "1px solid #ccc",
          }}
          disabled={loading}
        />
        <button
          onClick={handleSendMessage}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            borderRadius: "20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
          }}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </footer>
    </div>
  );
}

export default Bot;
