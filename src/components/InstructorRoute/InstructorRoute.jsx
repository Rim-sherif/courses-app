import { useSelector } from "react-redux";
import NotFound from "../../pages/NotFound";

export default function InstructorRoute({ children }) {
  const { loggedIn, role } = useSelector((state) => state.token);

  if (loggedIn && role === "instructor") {
    return children;
  } else {
    return <NotFound />;
  }
}
