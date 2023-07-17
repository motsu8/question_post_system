import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

chrome.runtime.sendMessage("get-extension-url", (res) => {
  console.log(res);
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
