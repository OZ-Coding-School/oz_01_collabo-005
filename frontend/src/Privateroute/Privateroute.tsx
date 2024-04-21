import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const isToken = !!localStorage.getItem("refreshToken");
  return isToken ? <Outlet /> : <Navigate to="/login" />;
}
