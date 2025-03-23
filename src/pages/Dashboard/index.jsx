import { Outlet } from 'react-router-dom';
import SideMenu from './SideMenu';
import Header from './Header';

const DashboardLayout = () => {
  return (
    <div className="grid lg:grid-cols-[250px_1fr] min-h-screen">
      <SideMenu />
      <div className="flex flex-col">
        <Header />
        <main className="bg-gray-50 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;