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
import DashboardLayout from "../pages/Dashboard";
import CoursesController from "../pages/Dashboard/CourseController";
import Main from "../pages/Dashboard/Main";
import Certificates from "../pages/Dashboard/Certificates";
// import ProtectedRoute from "../components/protectedRoute/protectedRoute";
// import AdminRoute from "../components/AdminRoute/AdminRoute";

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
        element: <Profile /> ,
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
  {
    path: "dashboard",
    element: <DashboardLayout/>,
      children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path:"main",
        element: <Main />,
      },
      {
        path: "course",
        element: <CoursesController />,
      },
      {
        path: "certificates",
        element: <Certificates />,
      },
    ],
  },
]);

export default router;
