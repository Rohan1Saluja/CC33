import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { JSX } from "react";
import type { RootState } from "../store";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
