import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";   // ✅ same folder
import "./App.css";            // ✅ case check karo, "app.css" nahi "App.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
