import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Courses from '../pages/Courses';
import Login from '../components/auth/Login/Login';
import Signup from '../components/auth/Signup/Signup';
import ForgetPassword from '../components/auth/ForgetPassword/ForgetPassword';
import ResetPassword from '../components/auth/ResetPassword/ResetPassword';
import Instructors from "../pages/Instructors"



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'courses',
        element: <Courses/>
      },
      {
        path: 'instructors',
        element: <Instructors/>
      },
      {
        path:'*',
        element:<NotFound />
      },
    ]
  },
  {
    path:'login',
    element:<Login />
  },
  {
    path:'signup',
    element:<Signup/>
  },
  {
    path:'forgetpassword',
    element:<ForgetPassword />
  },
  {
    path:'resetPassword/:token',
    element:<ResetPassword />
  },

  
]);

export default router;