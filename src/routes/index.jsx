import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Courses from '../pages/Courses';
import Login from '../pages/Login';
import Signup from '../pages/Signup';




const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'courses',
        element: <Courses/>
      }
    ]
  },
  {
    path:'login',
    element:<Login/>
  },
  {
    path:'signup',
    element:<Signup/>

  }
  
]);

export default router;