import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { setLoading, setUser } from '../../redux/reducers/userSlice';
import Header from './Header';
import SideMenu from './SideMenu';

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { userData, loading } = useSelector((state) => state.user);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);

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
      <div className={`fixed top-0 left-0 h-screen w-[300px] z-50 transform transition-transform duration-300 ${!isSideMenuOpen ? '-translate-x-full' : 'translate-x-0'}`}>
        <SideMenu userData={userData} />
      </div>
      <div className={`transition-all duration-300 ${isSideMenuOpen ? 'ml-[250px]' : 'ml-0'}`}>
        <div className="sticky top-0 z-40 w-full">
          <Header userData={userData} toggleSideMenu={() => setIsSideMenuOpen(!isSideMenuOpen)} isSideMenuOpen={isSideMenuOpen} />
        </div>
        <main className=" bg-gray-50 min-h-screen overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;




