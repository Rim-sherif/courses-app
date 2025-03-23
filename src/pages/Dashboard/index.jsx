import { Outlet } from 'react-router-dom';
import Header from './Header';
import SideMenu from './SideMenu';

const DashboardLayout = () => {
  return (
    <div className="relative">
      <div className="fixed top-0 left-0 h-screen w-[300px] z-50">
        <SideMenu />
      </div>
      <div className="pl-[250px]">
        <div className="sticky top-0 z-40">
          <Header />
        </div>
        <main className="py-6 bg-gray-50 min-h-screen overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;