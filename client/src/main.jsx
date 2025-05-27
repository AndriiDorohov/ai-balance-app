import React from "react";
import ReactDOM from "react-dom/client";
import createAppRouter from "./router/router";
import { RouterProvider } from "react-router-dom";
import "./index.css";

const router = createAppRouter();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
