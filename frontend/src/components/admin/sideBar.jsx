import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth"; // Your authentication hook
import { useDispatch } from "react-redux";
import { motion } from "framer-motion"; // Import Framer Motion

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Assuming your useAuth hook has a logout function
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user"); // Clear user data
    dispatch({ type: "LOGOUT" }); // Dispatch logout action
    navigate("/login"); // Redirect after logout
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="h-screen w-64 bg-gray-800 text-white fixed left-0 top-0 overflow-y-auto shadow-lg"
    >
      {/* Sidebar Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="p-6 text-center border-b border-gray-700"
      >
        <h1 className="text-2xl font-bold font-robotoSlab">Admin Panel</h1>
      </motion.div>

      {/* Navigation Links */}
      <nav className="mt-6">
        {[
          { to: "/admin/dashboard", label: "Dashboard" },
          { to: "/admin/users", label: "User Management" },
          { to: "/admin/listings", label: "Listings" },
          { to: "/admin/reports", label: "Reports" },
          { to: "/admin/settings", label: "Settings" },
        ].map((link, index) => (
          <motion.div
            key={link.to}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
          >
            <Link
              to={link.to}
              className="block px-6 py-3 font-oxygen hover:bg-gray-700 transition duration-200"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* Logout Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute bottom-0 w-full p-4"
      >
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-200 font-oxygen"
        >
          Logout
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;

// import { Link, useNavigate } from "react-router-dom";
// import useAuth from "../../hooks/useAuth"; // Your authentication hook
// import { useDispatch } from "react-redux";

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const { logout } = useAuth(); // Assuming your useAuth hook has a logout function
//   const dispatch =useDispatch();
//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("user"); // Clear user data
//     dispatch({ type: "LOGOUT" }); // Dispatch logout action
//     navigate("/login"); // Redirect after logout
//   };

//   return (
//     <div className="h-screen w-64 bg-gray-800 text-white fixed left-0 top-0 overflow-y-auto">
//       {/* Sidebar Header */}
//       <div className="p-6 text-center border-b border-gray-700">
//         <h1 className="text-xl font-bold">Admin Panel</h1>
//       </div>

//       {/* Navigation Links */}
//       <nav className="mt-6">
//         <Link
//           to="/admin/dashboard"
//           className="block px-6 py-3 hover:bg-gray-700 transition duration-200"
//         >
//           Dashboard
//         </Link>
//         <Link
//           to="/admin/users"
//           className="block px-6 py-3 hover:bg-gray-700 transition duration-200"
//         >
//           User Management
//         </Link>
//         <Link
//           to="/admin/listings"
//           className="block px-6 py-3 hover:bg-gray-700 transition duration-200"
//         >
//           Listings
//         </Link>
//         <Link
//           to="/admin/reports"
//           className="block px-6 py-3 hover:bg-gray-700 transition duration-200"
//         >
//           Reports
//         </Link>
//         <Link
//           to="/admin/settings"
//           className="block px-6 py-3 hover:bg-gray-700 transition duration-200"
//         >
//           Settings
//         </Link>
//       </nav>

//       {/* Logout Button */}
//       <div className="absolute bottom-0 w-full p-4">
//         <button
//           to="/logout"
//           className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-200"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;