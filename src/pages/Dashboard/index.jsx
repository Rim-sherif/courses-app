import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { NotificationsProvider } from '../../components/providers/NotificationsProvider';
import { setLoading, setUser } from "../../redux/reducers/userSlice";
import Header from "./Header";
import SideMenu from "./SideMenu";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { userData, loading } = useSelector((state) => state.user);
  
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Initialize state from localStorage
    const savedState = localStorage.getItem('sidebarOpen');
    if (savedState !== null) {
      setIsSideMenuOpen(JSON.parse(savedState));
    }

    // Check screen size
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSideMenuOpen(false);
      } else if (savedState === null) {
        setIsSideMenuOpen(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSideMenu = () => {
    const newState = !isSideMenuOpen;
    setIsSideMenuOpen(newState);
    localStorage.setItem('sidebarOpen', JSON.stringify(newState));
  };

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

  // Handle mobile behavior on navigation
  useEffect(() => {
    if (isMobile) {
      setIsSideMenuOpen(false);
    }
  }, [location.pathname, isMobile]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        Loading...
      </div>
    );
  }

  return (
    <NotificationsProvider>
      <div className="relative flex h-screen bg-gray-50 overflow-hidden">
        {userData && (
          <>
            <div
              className={`fixed md:absolute z-50 h-full w-[270px] bg-[#410445] transition-all duration-300 ${
                isSideMenuOpen ? "translate-x-0" : "-translate-x-full"
              } md:transform-none`}
            >
              <SideMenu
                isOpen={isSideMenuOpen}
                onClose={() => {
                  setIsSideMenuOpen(false);
                  localStorage.setItem('sidebarOpen', 'false');
                }}
              />
            </div>

            {isMobile && isSideMenuOpen && (
              <div
                className="fixed inset-0 bg-opacity-50 z-40"
                onClick={() => {
                  setIsSideMenuOpen(false);
                  localStorage.setItem('sidebarOpen', 'false');
                }}
              />
            )}

            <div 
              className={`flex-1 flex flex-col h-full transition-all duration-300 ${
                isSideMenuOpen ? "md:ml-[270px]" : "md:ml-0"
              }`}
            >
              <div className="sticky top-0 z-30 w-full">
                <Header
                  userData={userData}
                  toggleSideMenu={toggleSideMenu}
                  isSideMenuOpen={isSideMenuOpen}
                />
              </div>

              <div className="flex-1 overflow-auto">
                <main className="p-6">
                  <Outlet context={{ userData }} />
                </main>
              </div>
            </div>
          </>
        )}
      </div>
    </NotificationsProvider>
  );
};

export default DashboardLayout;