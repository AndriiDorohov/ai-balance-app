import React from "react";
import ReactDOM from "react-dom/client";
import createAppRouter from "./router/router";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/auth/AuthContext.jsx";
import "./index.css";

const router = createAppRouter();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
