import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "../DanceApp_3.jsx";

// Polyfill window.storage with localStorage for local dev.
// In the Claude Code preview environment, the native window.storage takes over.
if (!window.storage) {
  window.storage = {
    get: (key) => {
      const val = localStorage.getItem(key);
      return Promise.resolve(val ? { value: val } : null);
    },
    set: (key, value) => {
      localStorage.setItem(key, value);
      return Promise.resolve();
    },
  };
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
