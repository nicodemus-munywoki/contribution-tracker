import React from 'react';
import { Menu } from 'lucide-react';
import Search from '../components/Search';

const Navbar = ({ onMenuClick }) => {
  const userName = localStorage.getItem('userName') || 'User';
  const userRole = localStorage.getItem('userRole') || 'Admin';

  // Get initials from user name
  const getInitials = (name) => {
    const names = name.trim().split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase();
  };

  const initials = getInitials(userName);

  return (
    <div className='mb-6 bg-slate-100 px-4 py-3 shadow-md'>
      <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
        {/* Left section */}
        <div className='flex items-center w-full md:w-auto justify-between'>
          <div className='flex items-center gap-3'>
            {onMenuClick && (
              <button onClick={onMenuClick} className='md:hidden'>
                <Menu className='h-6 w-6 text-gray-800' />
              </button>
            )}
            <p className='text-xl'>
              <span className='text-green-700 font-extrabold'>Agro</span>
              <span className='text-red-600 font-bold'>Track</span>
            </p>
          </div>
        </div>

        {/* Search */}
        <div className='w-full md:w-1/3'>
          <Search />
        </div>

        {/* User profile */}
        <div className='flex items-center w-full md:w-auto justify-end gap-3'>
          {/* Initials Avatar */}
          <div className='w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold'>
            {initials}
          </div>
          <div className='text-left'>
            <h2 className='text-gray-800 text-xs font-bold'>{userName}</h2>
            <p className='text-gray-600 text-sm'>{userRole}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
