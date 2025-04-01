import { createBrowserRouter, Navigate } from "react-router-dom";
import BlogsPage from "../feature/Blog/Blog";
import CreateBlogPage from "../feature/Blog/CreateBlog";
import EditBlogPage from "../feature/Blog/EditBlogPage";
import Home from "../feature/Home/Home";
import Login from "../feature/Login";
import News from "../feature/News/News";
import NewsDetail from "../feature/News/NewsDetail";
import Profile from "../feature/Profile/Profile";
import CreateUserForm from "../feature/Users/components/CreateUserForm";
import Users from "../feature/Users/components/Users";
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
      {
        children: [
          {
            index: true,
            path: ROUTES.USERS,
            element: <Users />,
          },
          {
            path: ROUTES.CREATEUSER,
            element: <CreateUserForm />,
          },
        ],
      },
      { path: ROUTES.NEWS, element: <News /> },
      { path: `${ROUTES.NEWS}/:articleId`, element: <NewsDetail /> },
      { path: ROUTES.PROFILE, element: <Profile /> },
      {
        children: [
          { path: ROUTES.BLOG, element: <BlogsPage /> },
          { path: ROUTES.CREATEBLOG, element: <CreateBlogPage /> },
          { path: `${ROUTES.EDITBLOG}/:blogId`, element: <EditBlogPage /> },
        ],
      },
    ],
  },
]);
