import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "./sideBar";
import Header from "./Header";
import { toggleSidebar } from "../../redux/uiSlice";

const AdminLayout = ({ children }) => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.ui.isSidebarOpen);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - Always visible */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header toggleSidebar={handleToggleSidebar} />
      </div>

      {/* Main content area with sidebar and content */}
      <div className="flex flex-1 pt-16"> {/* Add padding-top to account for fixed header */}
        {/* Sidebar */}
        <div
          className={`fixed left-0 top-16 bottom-0 bg-gray-900 transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out z-40`}
        >
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <main 
          className={`flex-1 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;