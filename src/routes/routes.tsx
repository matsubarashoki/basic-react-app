import { createBrowserRouter, Navigate } from "react-router-dom";
import Donation from "../pages/Donation/Donation";
import Gallery from "../pages/Gallery/Gallery";
import Home from "../pages/Home/Home";
import InquiryForm from "../pages/InquiryForm/InquiryForm";
import Login from "../pages/Login";
import News from "../pages/News/News";
import NewsDetail from "../pages/News/NewsDetail";
import Profile from "../pages/Profile/Profile";
import PromotionBoard from "../pages/PromotionBoard/PromotionBoard";
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
      { path: ROUTES.NEWS, element: <News /> },
      { path: `${ROUTES.NEWS}/:articleId`, element: <NewsDetail /> },
      { path: ROUTES.GALLERY, element: <Gallery /> },
      { path: ROUTES.PROFILE, element: <Profile /> },
      { path: ROUTES.PROMOTIONBOARD, element: <PromotionBoard /> },
      { path: ROUTES.INPUIRYFORM, element: <InquiryForm /> },
      { path: ROUTES.DONATION, element: <Donation /> },
    ],
  },
]);
