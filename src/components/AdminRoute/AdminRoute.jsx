import { useSelector } from "react-redux";
import NotFound from "../../pages/NotFound";

export default function AdminRoute({ children }) {
  const { loggedIn, role } = useSelector((state) => state.token);

  if (loggedIn && role === "admin") {
    return children;
  } else {
    return <NotFound />;
  }
}
