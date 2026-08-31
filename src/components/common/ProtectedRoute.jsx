import { Navigate, Outlet } from "react-router-dom";
import { authService } from "../../services/api";

export default function ProtectedRoute() {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
