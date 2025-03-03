import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { toggleSidebar } from '../../redux/uiSlice';
import clsx from 'clsx'; // For better class name management

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.ui.isSidebarOpen);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - Always visible */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header toggleSidebar={handleToggleSidebar} isSidebarOpen={isSidebarOpen} />
      </div>

      {/* Main content area with sidebar and content */}
      <div className="flex flex-1 pt-16"> {/* Add padding-top to account for fixed header */}
        {/* Sidebar */}
        <div
          className={clsx(
            'fixed left-0 top-16 bottom-0 bg-gray-900 transform transition-transform duration-300 ease-in-out z-40',
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <Sidebar onClose={handleToggleSidebar} />
        </div>

        {/* Main Content Area */}
        <main
          className={clsx(
            'flex-1 p-6 transition-all duration-300 ease-in-out',
            isSidebarOpen ? 'ml-64' : 'ml-0'
          )}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;