import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Courses from "../pages/Courses";
import Login from "../components/auth/Login/Login";
import Signup from "../components/auth/Signup/Signup";
import ForgetPassword from "../components/auth/ForgetPassword/ForgetPassword";
import ResetPassword from "../components/auth/ResetPassword/ResetPassword";
import Instructors from "../pages/Instructors";
import Search from "../pages/Search";
import Profile from "../pages/Profile";
import ConfirmEmail from "../components/auth/ConfirmEmail";
import InstructorDetails from "../pages/InstructorDetails";
import AdminRoute from "../components/AdminRoute/AdminRoute";
import InstructorRoute from "../components/InstructorRoute/InstructorRoute";
import UserRoute from "../components/UserRoute/UserRoute";
// import Dashboard from "../pages/Dashboard";
// import InstructorDashboard from "../pages/InstructorDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "instructors",
        element: <Instructors />,
      },
      { path: "instructors/:id", element: <InstructorDetails /> },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "forgetpassword",
    element: <ForgetPassword />,
  },
  {
    path: "confirm/email/:token",
    element: <ConfirmEmail />,
  },
  {
    path: "resetPassword",
    element: <ResetPassword />,
  },
]);

export default router;
