import App from "./App";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import AuthProvider from "./providers/Auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/js/bootstrap.js";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);

reportWebVitals();
