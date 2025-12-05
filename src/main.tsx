// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";          // ✅ بدون آکولاد و با A بزرگ
import "./index.css";
import "./pages/auth/auth.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
