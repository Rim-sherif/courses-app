import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { setLoading, setUser } from '../../redux/reducers/userSlice';
import Header from './Header';
import SideMenu from './SideMenu';

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { userData, loading } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/user/profile",
          { withCredentials: true }
        );

        if (response.data.success) {
          dispatch(setUser(response.data.user));
          
        }

      } catch (error) {
        console.error("Error fetching data:", error);
        dispatch(setLoading(false));
      }
    };
    
    fetchData();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 h-screen w-[300px] z-50">
        <SideMenu userData={userData} />
      </div>
      <div className="pl-[250px]">
        <div className="sticky top-0 z-40">
          <Header userData={userData} />
        </div>
        <main className="py-6 bg-gray-50 min-h-screen overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;