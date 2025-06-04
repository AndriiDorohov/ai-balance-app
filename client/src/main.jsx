import React from "react";
import ReactDOM from "react-dom/client";
import createAppRouter from "./router/router";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/auth/AuthContext.jsx";
import "modern-normalize";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { Web3Provider } from "./web3/context/Web3Context.jsx";

const router = createAppRouter();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Web3Provider>
        <RouterProvider router={router} />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#e0ecff",
              color: "#333",
              fontSize: "1rem",
              fontWeight: "500",
              borderRadius: "10px",
              padding: "12px 16px",
              boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
            },
          }}
        />
      </Web3Provider>
    </AuthProvider>
  </React.StrictMode>,
);
