import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import News from "../pages/News/News";
import NewsDetail from "../pages/News/NewsDetail";
import Profile from "../pages/Profile/Profile";
import Users from "../pages/Users";
import ProtectedRoute from "./ProtectedRoute";
import { ROUTES } from "./routeConfig";

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <Navigate to={ROUTES.LOGIN} replace />,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: ROUTES.HOME, element: <Home /> },
      { path: ROUTES.USERS, element: <Users /> },
      { path: ROUTES.NEWS, element: <News /> },
      { path: `${ROUTES.NEWS}/:articleId`, element: <NewsDetail /> },
      { path: ROUTES.PROFILE, element: <Profile /> },
    ],
  },
]);
