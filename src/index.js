import React from "react";
import "./index.css";
import App from "./App";
import { FirebaseProvider } from "./Firebase";
import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));
root.render(
  <FirebaseProvider>
    <App />
  </FirebaseProvider>
);
