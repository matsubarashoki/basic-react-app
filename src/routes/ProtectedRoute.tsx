import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../stores/userStore";

interface ProtectedRouteProps {
  children?: ReactNode; // children をオプションとして定義
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
