import { useState } from "react";
import { Menu } from "@headlessui/react";
import { AiOutlineUser, AiOutlineBell, AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { BsSun, BsMoon } from "react-icons/bs";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Header = ({toggleSidebar}) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  // Generate breadcrumbs from the current route
  const pathnames = location.pathname.split("/").filter((x) => x);
  const breadcrumbs = pathnames.map((name, index) => {
    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
    return (
      <span key={name}>
        {index > 0 && <span className="mx-2">/</span>}
        <Link to={routeTo} className="hover:text-blue-500">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Link>
      </span>
    );
  });

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center">
      {/* Left Section: Toggle and Breadcrumbs */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <AiOutlineMenu className="text-xl text-gray-600 dark:text-gray-300" />
        </button>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {breadcrumbs}
        </div>
      </div>

      {/* Center Section: Search Bar */}
      <div className="flex-1 flex justify-center mx-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <AiOutlineSearch className="absolute left-3 top-3 text-gray-400 dark:text-gray-300" />
        </div>
      </div>

      {/* Right Section: Notifications, Dark Mode Toggle, and Profile Dropdown */}
      <div className="flex items-center space-x-4">
        {/* Notifications Dropdown */}
        <Menu as="div" className="relative">
          <Menu.Button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <AiOutlineBell className="text-xl text-gray-600 dark:text-gray-300" />
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={`${
                    active ? "bg-gray-100 dark:bg-gray-600" : ""
                  } block px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                >
                  No new notifications
                </div>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          {isDarkMode ? (
            <BsMoon className="text-xl text-gray-600 dark:text-gray-300" />
          ) : (
            <BsSun className="text-xl text-gray-600 dark:text-gray-300" />
          )}
        </button>

        {/* Profile Dropdown */}
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center space-x-2 hover:text-blue-500">
            <AiOutlineUser className="text-xl" />
            <span>Profile</span>
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-gray-100 dark:bg-gray-600" : ""
                  } block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                  onClick={() => navigate("/admin/profile")}
                >
                  Profile
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-gray-100 dark:bg-gray-600" : ""
                  } block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                  onClick={() => navigate("/admin/settings")}
                >
                  Settings
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-gray-100 dark:bg-gray-600" : ""
                  } block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
    </header>
  );
};

export default Header;