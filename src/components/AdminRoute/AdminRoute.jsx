import ProtectedRoute from "../protectedRoute/protectedRoute";

const InstructorRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={["instructor"]}>{children}</ProtectedRoute>
);

export default InstructorRoute;
