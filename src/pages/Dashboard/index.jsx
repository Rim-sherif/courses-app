import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { setLoading, setUser } from "../../redux/reducers/userSlice";
import Header from "./Header";
import SideMenu from "./SideMenu";
import { NotificationsProvider } from '../../components/providers/NotificationsProvider';

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { userData, loading } = useSelector((state) => state.user);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(() => {
    return window.innerWidth >= 768;
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
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

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // If switching to mobile view, close the sidebar
      if (mobile) {
        setIsSideMenuOpen(false);
      }
      // If switching to desktop view, open the sidebar (unless user explicitly closed it)
      else if (localStorage.getItem('sidebarClosed') !== 'true') {
        setIsSideMenuOpen(true);
      }
    };
  
    // Check localStorage for user's sidebar preference
    const savedPreference = localStorage.getItem('sidebarClosed') === 'true';
    if (!isMobile && !savedPreference) {
      setIsSideMenuOpen(true);
    }
  
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
  
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Removed isSideMenuOpen dependency to prevent infinite loops

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
          {/* Sidebar - now using absolute positioning on desktop when closed */}
          <div
            className={`fixed md:absolute z-50 h-full w-[270px] bg-[#410445] transition-all duration-300 ${
              isSideMenuOpen ? "translate-x-0" : "-translate-x-full"
            } md:transform-none`}
          >
            <SideMenu
              isOpen={isSideMenuOpen}
              onClose={() => setIsSideMenuOpen(false)}
            />
          </div>

          {/* Overlay for mobile */}
          {isMobile && isSideMenuOpen && (
            <div
              className="fixed inset-0 bg-opacity-50 z-40"
              onClick={() => setIsSideMenuOpen(false)}
            />
          )}

          {/* Main content area - now adjusts width based on sidebar state */}
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
                <Outlet />
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