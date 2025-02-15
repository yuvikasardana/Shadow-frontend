import React, { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";
import { io } from "socket.io-client";
import "./chat.scss";

const Chat = () => {
  const { isAuthenticated, logout } = useAuth();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
    } else {
      setUsername("Guest");
    }
  }, []);

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setMessages(savedMessages);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const newSocket = io("https://shadow-backend-pnsv.onrender.com", {
        auth: { token: localStorage.getItem("token") },
      });

      setSocket(newSocket);

      newSocket.on("connect", () => console.log("✅ Connected to WebSocket server"));
      
      // Handle incoming messages
      newSocket.on("message", (msg) => {
        console.log("📩 Received message:", msg);

        setMessages((prev) => {
          const updatedMessages = [...prev, msg];
          localStorage.setItem("chatHistory", JSON.stringify(updatedMessages));
          return updatedMessages;
        });
      });

      newSocket.on("disconnect", () => console.log("❌ Disconnected from WebSocket server"));

      return () => {
        newSocket.off("message");
        newSocket.disconnect();
      };
    }
  }, [isAuthenticated]);

  const sendMessage = () => {
    if (message.trim() !== "" && socket) {
      const userMessage = { text: message, sender: username };
      
      socket.emit("message", userMessage);
      
      setMessage("");
    }
  };
  const clearChat = () => {
    setMessages([]); // Clear UI messages
    localStorage.removeItem("chatHistory"); // Remove from local storage
    console.log("🗑️ Chat cleared");
  };


  if (!isAuthenticated) {
    return <p>Please log in to access the chat.</p>;
  }

  return (
    <div className="chat-container">
      <div className="chat-box">
      <div className="chat-header">
        <h2> Shadow Chat</h2>
        <button className="clear-btn" onClick={clearChat}>🗑️ Clear Chat</button>
        <button className="logout-btn" onClick={logout}>🚪 Logout</button>
      </div>
      
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === username ? "user" : "server"}`}>
            <span className="sender">{msg.sender}:</span> {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>📩 Send</button>
      </div>
    </div>
  );
};

export default Chat;
