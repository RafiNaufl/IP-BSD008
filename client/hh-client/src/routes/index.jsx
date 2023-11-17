import { createBrowserRouter, redirect } from "react-router-dom";
import Parent from "../pages/Parent";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import HomePage from "../pages/HomePage";
import PsycologType from "../pages/PsycologType";
import OfflineType from "../pages/OfflineType";

const isAuthenticated = () => !!localStorage.access_token;

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    loader: async () => {
      return isAuthenticated() ? redirect("/dashboard") : null;
    },
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: async () => {
      return isAuthenticated() ? redirect("/dashboard") : null;
    },
  },
  {
    path: "/dashboard",
    element: <Parent />,
    loader: async () => {
      return isAuthenticated() ? null : redirect("/login");
    },
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/dashboard/psycolog-type",
        element: <PsycologType />,
      },
      {
        path: "/dashboard/psycolog-type/offline-type",
        element: <OfflineType />,
      },
    ],
  },
  // Tambahkan rute tambahan di sini jika diperlukan
]);

export default router;
