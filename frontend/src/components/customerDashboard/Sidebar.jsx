import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import { AiOutlineHome, AiOutlineDashboard, AiOutlineMessage, AiOutlineProfile } from "react-icons/ai";
import { MdOutlineListAlt } from "react-icons/md";

const Sidebar = () => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full bg-gray-900 text-white"
    >
      <nav className="w-64">
        <ul className="space-y-2 p-4">
          {/* Home Link */}
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* <Link
              to="/"
              className="flex items-center py-2 px-4 hover:bg-gray-700 rounded transition-colors font-oxygen"
            >
              <AiOutlineHome className="mr-2" />
              Home
            </Link> */}
          </motion.li>

          {/* Dashboard Link */}
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {/* <Link
              to="/customer/dashboard"
              className="flex items-center py-2 px-4 hover:bg-gray-700 rounded transition-colors font-oxygen"
            >
              <AiOutlineDashboard className="mr-2" />
              Dashboard
            </Link> */}
          </motion.li>

          {/* Messages Link */}
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link
              to="/customer/messages"
              className="flex items-center py-2 px-4 hover:bg-gray-700 rounded transition-colors font-oxygen"
            >
              <AiOutlineMessage className="mr-2" />
              Messages
            </Link>
          </motion.li>

          {/* My Listings Link */}
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Link
              to="/customer/my-listings/:userId"
              className="flex items-center py-2 px-4 hover:bg-gray-700 rounded transition-colors font-oxygen"
            >
              <MdOutlineListAlt className="mr-2" />
              My Listings
            </Link>
          </motion.li>

          {/* Review Link */}
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link
              to="/customer/review"
              className="flex items-center py-2 px-4 hover:bg-gray-700 rounded transition-colors font-oxygen"
            >
              <MdOutlineListAlt className="mr-2" />
              Review
            </Link>
          </motion.li>

          {/* Profile Link */}
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Link
              to="/customer/profile"
              className="flex items-center py-2 px-4 hover:bg-gray-700 rounded transition-colors font-oxygen"
            >
              <AiOutlineProfile className="mr-2" />
              Profile
            </Link>
          </motion.li>
        </ul>
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
// import { Link } from 'react-router-dom';
// import { AiOutlineHome, AiOutlineDashboard, AiOutlineMessage, AiOutlineProfile } from 'react-icons/ai';
// import { MdOutlineListAlt } from 'react-icons/md';

// const Sidebar = () => {
//   return (
//     <aside className="h-full bg-gray-900 text-white">
//       <nav className="w-64">
//         <ul className="space-y-2 p-4">
//           <li>
//             <Link
//               to="/"
//               className="flex items-center py-2 px-4 hover:bg-gray-700 rounded transition-colors"
//             >
//               <AiOutlineHome className="mr-2" />
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/customer/dashboard"
//               className="flex items-center py-2 px-4 hover:bg-gray-700 rounded transition-colors"
//             >
//               <AiOutlineDashboard className="mr-2" />
//               Dashboard
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/customer/messages"
//               className="flex items-center py-2 px-4 hover:bg-gray-700 rounded transition-colors"
//             >
//               <AiOutlineMessage className="mr-2" />
//               Messages
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/customer/my-listings/:userId"
//               className="flex items-center py-2 px-4 hover:bg-gray-700 rounded transition-colors"
//             >
//               <MdOutlineListAlt className="mr-2" />
//               My Listings
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/customer/review"
//               className="flex items-center py-2 px-4 hover:bg-gray-700 rounded transition-colors"
//             >
//               <MdOutlineListAlt className="mr-2" />
//               Review
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/customer/profile"
//               className="flex items-center py-2 px-4 hover:bg-gray-700 rounded transition-colors"
//             >
//               <AiOutlineProfile className="mr-2" />
//               Profile
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;