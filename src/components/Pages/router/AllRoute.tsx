import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./MainLayout";
import ErrorPage from "../Errorpage/ErrorPage";
import AllNote from "../AllNote/AllNote";
import Favorites from "../FavoritesPage/Favorites";
import Dashboard from "../Dashboard/Dashboard";
import Home from "../Home/Home";

import NotFound from "../Dashboard/NotFound";
import DashboardLayout from "../Dashboard/DashboardLayout";

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
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "all-note",
        element: <AllNote />,
      },
      {
        path: "favorite-note",
        element: <Favorites />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
