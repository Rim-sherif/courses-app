import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ConfirmEmail from "../components/auth/ConfirmEmail";
import ForgetPassword from "../components/auth/ForgetPassword/ForgetPassword";
import Login from "../components/auth/Login/Login";
import ResetPassword from "../components/auth/ResetPassword/ResetPassword";
import Signup from "../components/auth/Signup/Signup";
import CourseDetails from "../pages/CourseDetails";
import Courses from "../pages/Courses";
import DashboardLayout from "../pages/Dashboard";
import AccountVerification from "../pages/Dashboard/AccountVefication";
import Certificates from "../pages/Dashboard/Certificates";
import CoursesController from "../pages/Dashboard/CourseController";
import AddCourse from "../pages/Dashboard/CourseController/AddCourse";
import FreeCourses from "../pages/Dashboard/CourseController/FreeCourses";
import PaidCourses from "../pages/Dashboard/CourseController/PaidCourses";
import SingleCourse from "../pages/Dashboard/CourseController/SingleCourse";
import CustomerSupport from "../pages/Dashboard/CustomerSupport";
import LiveStream from "../pages/Dashboard/LiveStrem";
import Main from "../pages/Dashboard/Main";
import Settings from "../pages/Dashboard/Settings";
import Home from "../pages/Home";
import InstructorDetails from "../pages/InstructorDetails";
import Instructors from "../pages/Instructors";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import Search from "../pages/Search";
import Categories from "../pages/Categories";
import CategoryCourses from "../pages/CategoryCourse";
import Wishlist from "../pages/wishlist";
import Cart from "../pages/Cart";
import ProfileInstructor from "../pages/Dashboard/Profile";
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
      { path: "course/:id", element: <CourseDetails /> },
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
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "category/:categoryId",
        element: <CategoryCourses />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "cart",
        element: <Cart />,
      }
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
        children: [
          {
            path: "add",
            element: <AddCourse />,
          },
          {
            path: "free",
            element: <FreeCourses />,
          },
          {
            path: "paid",
            element: <PaidCourses />,
          },
          {
            path: ":id",
            element: <SingleCourse />,
          }
        ],
      },
      {
        path: "certificates",
        element: <Certificates />,
      },
      {
        path: "profile",
        element: <ProfileInstructor />,
      },
      {
        path: "verification",
        element: <AccountVerification />,
      },
      {
        path : "setting",
       element : <Settings/>
      },
      {
        path: "support",
        element: <CustomerSupport />,
      },
      {
        path: "live-stream",
        element: <LiveStream />,
      }
    ],
  },
]);

export default router;
