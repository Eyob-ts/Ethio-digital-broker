import { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import { AiOutlineUser, AiOutlineBell, AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { BsSun, BsMoon } from "react-icons/bs";
import { MdOutlineAddBox } from "react-icons/md";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ThemeToggle from '../ThemeToggle';
import { logout } from '../../redux/authSlice';
import { markAsRead, markAllAsRead } from '../../redux/notificationSlice';
import axios from 'axios';

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const notifications = useSelector((state) => state.notifications.notifications);
  const unreadCount = useSelector((state) => state.notifications.unreadCount);
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      dispatch(markAsRead(notification.id));
    }
    // Navigate to the message if it's a message notification
    if (notification.type === 'message') {
      navigate('/customer/messages');
    }
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  const formatNotificationTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <header className={`bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center`}>
      {/* Left Section: Toggle and Breadcrumbs */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <AiOutlineMenu className="text-xl text-gray-600 dark:text-gray-300" />
        </button>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {location.pathname.split("/").map((name, index) => (
            <span key={name}>
              {index > 0 && <span className="mx-2">/</span>}
              <Link to={`/${name}`} className="hover:text-blue-500">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Link>
            </span>
          ))}
        </div>
      </div>

      {/* Right Section: Add Listing, Notifications, Dark Mode Toggle, and Profile */}
      <div className="flex items-center space-x-4">
        {/* Home Link */}
        <Link
          to="/"
          className="flex items-center space-x-1 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 hover:text-blue-500"
          title="Go to Home"
        >
          <span>Home</span>
        </Link>

        {/* Add Listing Button */}
        <Link
          to="/addlisting"
          className="flex items-center space-x-1 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-blue-500 hover:text-blue-600"
          title="Add New Listing"
        >
          <MdOutlineAddBox className="text-xl" />
        </Link>

        {/* Notifications Dropdown */}
        <Menu as="div" className="relative">
          <Menu.Button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full relative">
            <AiOutlineBell className="text-xl text-gray-600 dark:text-gray-300" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-50">
            <div className="p-2 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400"
                >
                  Mark all as read
                </button>
              )}
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <button
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-600 ${
                      !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          {formatNotificationTime(notification.timestamp)}
                        </p>
                      </div>
                      {!notification.read && (
                        <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </Menu.Items>
        </Menu>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Profile Menu */}
        <Menu as="div" className="relative">
          <Menu.Button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <AiOutlineUser className="text-xl text-gray-600 dark:text-gray-300" />
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/customer/profile"
                  className={`${
                    active ? 'bg-gray-100 dark:bg-gray-600' : ''
                  } block px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                >
                  Profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`${
                    active ? 'bg-gray-100 dark:bg-gray-600' : ''
                  } block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400`}
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