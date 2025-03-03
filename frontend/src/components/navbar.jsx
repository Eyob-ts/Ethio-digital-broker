import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdBuild, MdDirectionsCar, MdOutlineHouse } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import logo from "../assets/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { Menu } from "@headlessui/react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "admin";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  // Track scrolling to update navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
  };

  // Hide navbar if user is on the Customer Dashboard
  if (isLoggedIn && location.pathname.startsWith("/customer/")) {
    return null;
  }

  return (
    <nav
      className={`${
        isScrolled ? "bg-white dark:bg-gray-800 shadow-md" : "bg-transparent"
      } fixed top-0 w-full z-10 text-black dark:text-white px-4 py-3 transition duration-300`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Title */}
        <Link to="/">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-[70px] w-auto" />
            <span className="text-2xl font-oxygen">Ethio Digital Broker</span>
          </div>
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-400 font-oxygen">Home</Link>
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="hover:text-blue-400 font-oxygen flex items-center">
              Service <MdBuild className="ml-1" />
            </Menu.Button>
            <Menu.Items className="absolute bg-white dark:bg-gray-700 text-gray-800 dark:text-white mt-2 rounded shadow-lg">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#house"
                    className={`block px-4 py-2 flex items-center ${
                      active ? "bg-gray-100 dark:bg-gray-600" : ""
                    }`}
                  >
                    <MdOutlineHouse className="mr-2 font-oxygen" />
                    House
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#car"
                    className={`block px-4 py-2 flex items-center ${
                      active ? "bg-gray-100 dark:bg-gray-600" : ""
                    }`}
                  >
                    <MdDirectionsCar className="mr-2 font-oxygen" />
                    Car
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#construction"
                    className={`block px-4 py-2 flex items-center ${
                      active ? "bg-gray-100 dark:bg-gray-600" : ""
                    }`}
                  >
                    <MdBuild className="mr-2 font-oxygen" />
                    Construction
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
          <Link to="/about" className="hover:text-blue-400 font-oxygen">About</Link>
          <Link to="/contact" className="hover:text-blue-400 font-oxygen">Contact</Link>
        </div>

        {/* Right Side - Auth Links and Theme Toggle */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Link
                to={isAdmin ? "/admin/dashboard" : "/customer/dashboard"}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center space-x-1 hover:text-blue-400"
              >
                <AiOutlineUser />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          {isNavOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isNavOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 mt-2 py-4">
          <div className="flex flex-col space-y-4 px-4">
            <Link to="/" className="hover:text-blue-400">Home</Link>
            <Link to="/about" className="hover:text-blue-400">About</Link>
            <Link to="/contact" className="hover:text-blue-400">Contact</Link>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              {isLoggedIn ? (
                <>
                  <Link
                    to={isAdmin ? "/admin/dashboard" : "/customer/dashboard"}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center space-x-1 hover:text-blue-400"
                  >
                    <AiOutlineUser />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
