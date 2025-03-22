import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { loggedIn, role } = useSelector((state) => state.token || {}); 

  if (!loggedIn || (allowedRoles && !allowedRoles.includes(role))) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
