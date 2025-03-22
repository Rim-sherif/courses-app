import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { loggedIn } = useSelector((state) => state.token);

  if (loggedIn) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
