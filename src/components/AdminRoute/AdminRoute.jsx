import ProtectedRoute from "../protectedRoute/protectedRoute";

const AdminRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={["admin", "instructor"]}>
    {children}
  </ProtectedRoute>
);

export default AdminRoute;
