import { BrowserRouter } from "react-router-dom";
import router from "../../router/router";
import { RouterProvider } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <RouterProvider router={router} />
      </MainLayout>
    </BrowserRouter>
  );
}
