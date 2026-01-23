import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role, roles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" />;
  }

  // Handle single role string
  if (role && userRole !== role) {
    return <Navigate to="/login" />;
  }

  // Handle multiple roles array
  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
