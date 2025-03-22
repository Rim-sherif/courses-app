import ProtectedRoute from "../protectedRoute/protectedRoute";

const AdminRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={["admin"]}>{children}</ProtectedRoute>
);

export default AdminRoute;
