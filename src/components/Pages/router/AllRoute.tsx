import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./MainLayout";
import ErrorPage from "../Errorpage/ErrorPage";
import AllNote from "../AllNote/AllNote";
import Favorites from "../FavoritesPage/Favorites";
import Dashboard from "../Dashboard/Dashboard";
import Home from "../Home/Home";

import NotFound from "../Dashboard/NotFound";
import DashboardLayout from "../Dashboard/DashboardLayout";
import CreateNote from "../AllNote/CreateNote";
import LoginPage from "../Login/LoginPage";
import RegisterPage from "../Register/RegisterPage";

import Archived from "../Dashboard/Archived";
import ProtectedRoute from "../AuthProvider/ProtectedRoute";
import EditNote from "../AllNote/EditNote";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "all-notes",
        element: <AllNote />,
      },
      {
        path: "edit-note/:_id",
        element: <EditNote />,
      },
      {
        path: "favorite-note",
        element: <Favorites />,
      },
      {
        path: "create-note",
        element: <CreateNote />,
      },

      {
        path: "archived",
        element: <Archived />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
