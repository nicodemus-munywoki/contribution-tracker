import Logo from './Logo';
import { Info, X } from 'lucide-react';
import { VscDashboard, VscFolderLibrary } from 'react-icons/vsc';
import { GiBroccoli, GiCow, GiGoat, GiRooster } from 'react-icons/gi';
import { PiMapPinLine } from 'react-icons/pi';
import { CiShop } from 'react-icons/ci';

const Sidebar = ({ closeSidebar }) => {
  return (
    <div className='h-full bg-green-800 text-white p-4 relative'>
      {/* Close button (mobile only) */}
      {closeSidebar && (
        <button
          onClick={closeSidebar}
          className='absolute top-4 right-4 md:hidden text-white'
        >
          <X size={24} />
        </button>
      )}

      {/* Logo Container */}
      <div className='flex justify-center mb-6'>
        <div className='logo-brand'>
          <Logo />
        </div>
      </div>

      <nav className='mt-2'>
        <ul className='text-sm'>
          <li>
            <a
              href='/dashboard'
              className='flex items-center gap-2 p-2 hover:bg-green-700 rounded'
            >
              <VscDashboard size={20} />
              <span>Dashboard</span>
            </a>
          </li>
          <hr className='border-white/30' />

          <li>
            <a
              href='/livestock'
              className='flex items-center gap-2 p-2 hover:bg-green-700 rounded'
            >
              <GiCow size={20} />
              <span>Members</span>
            </a>
          </li>
          <li>
            <a
              href='/crops'
              className='flex items-center gap-2 p-2 hover:bg-green-700 rounded'
            >
              <GiBroccoli size={20} />
              <span>Events</span>
            </a>
          </li>
          <li>
            <a
              href='/poultry'
              className='flex items-center gap-2 p-2 hover:bg-green-700 rounded'
            >
              <GiRooster size={20} />
              <span>Contributions</span>
            </a>
          </li>
          <li>
            <a
              href='/goats'
              className='flex items-center gap-2 p-2 hover:bg-green-700 rounded'
            >
              <GiGoat size={20} />
              <span>Archives</span>
            </a>
          </li>
          <hr className='border-white/30' />
          <li>
            <a
              href='/about'
              className='flex items-center gap-2 p-2 hover:bg-green-700 rounded'
            >
              <Info size={20} />
              <span>About us</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
