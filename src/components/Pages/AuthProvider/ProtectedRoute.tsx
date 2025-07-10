/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/ProtectedRoute.tsx

import { Navigate, useLocation } from "react-router-dom";

import { ScaleLoader } from "react-spinners";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }: { children: any }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div>
        <ScaleLoader color="#2cabab" height={12} />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  if (user.role !== "user") {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default ProtectedRoute;
