import { useState } from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../partials/Sidebar';
import Navbar from '../partials/Navbar';
import { Menu } from 'lucide-react'; // Optional: Icon for the hamburger

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className='flex h-screen bg-green-50'>
      {/* Sidebar for large screens */}
      <div className='hidden md:block'>
        <Sidebar />
      </div>

      {/* Sidebar overlay for small screens */}
      {sidebarOpen && (
        <div className='fixed inset-0 z-50 flex'>
          <div className='w-64 bg-white shadow-lg'>
            <Sidebar closeSidebar={() => setSidebarOpen(false)} />
          </div>
          <div
            className='flex-1 bg-black bg-opacity-50'
            onClick={toggleSidebar}
          ></div>
        </div>
      )}

      {/* Main content */}
      <div className='flex-1 overflow-auto'>
        <Navbar onMenuClick={toggleSidebar} />
        <div className='p-2'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
