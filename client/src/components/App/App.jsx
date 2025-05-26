import { RouterProvider } from "react-router-dom";
import router from "../../router/router";
import MainLayout from "../../layouts/MainLayout";

export default function App() {
  return (
    <MainLayout>
      <RouterProvider router={router} />
    </MainLayout>
  );
}
