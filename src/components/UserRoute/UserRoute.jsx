import ProtectedRoute from "../protectedRoute/protectedRoute";

const UserRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={["user"]}>{children}</ProtectedRoute>
);

export default UserRoute;
