import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom"; // Import useParams
import { motion } from "framer-motion"; // Import Framer Motion
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons from react-icons
import { spiral } from "ldrs";
spiral.register();

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const MyListings = () => {
  const { userId } = useParams(); // Get userId from URL parameters
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch listings when the component mounts or userId changes
  useEffect(() => {
    if (userId) {
      fetchListings();
    }
  }, [userId]); // Add userId as a dependency

  // Function to fetch listings
  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/api/listings/users/${userId}/listings`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        });
      
      setListings(response.data.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch listings. Please try again.");
      console.error("Error fetching listings:", err);
    } finally {
      setLoading(false);
    }
  };


  // Function to delete a listing
  const handleDeleteListing = async (listingId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/listings/deletelist/${listingId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        }
      );
      console.log("Listing deleted:", response.data);
      setListings(listings.filter((listing) => listing._id !== listingId));
    } catch (err) {
      setError("Failed to delete listing. Please try again.");
      console.error("Error deleting listing:", err);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <l-spiral size="40" speed="0.9" color="blue"></l-spiral>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen"
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white font-robotoSlab">
        My Listings
      </h1>

      {/* Error Message */}
      {error && <p className="text-red-500 dark:text-red-400 mb-4 font-oxygen">{error}</p>}

      {/* Add Listing Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-6"
      >
        {/* <Link
          to="/addlisting"
          className="bg-gradient-to-br from-blue-900 to-blue-700 text-white px-4 py-2 rounded hover:brightness-110 transition-all duration-200 font-oxygen"
        >
          Add New Listing
        </Link> */}
      </motion.div>

      {/* Listings List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {listings.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300 font-oxygen">
            No listings found.{" "}
            <Link to="/add-listing" className="text-blue-500 hover:underline">
              Add your first listing!
            </Link>
          </p>
        ) : (
          <div className="space-y-4">
            {listings.map((listing, index) => (
              <motion.div
                key={listing._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="p-4 border rounded bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white font-robotoSlab">
                      {listing.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 font-oxygen">
                      {listing.description}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-oxygen">
                      Price: ${listing.price}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-oxygen">
                      Created At: {new Date(listing.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    {/* Edit Button */}
                    <Link
                      to={`/updatelist/${listing._id}`}
                      className="bg-gradient-to-br from-blue-600 to-blue-500 text-white px-3 py-1 rounded hover:brightness-110 transition-all duration-200 font-oxygen flex items-center gap-2"
                    >
                      <FaEdit className="w-4 h-4" /> {/* Edit Icon */}
                      Edit
                    </Link>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteListing(listing._id)}
                      className="bg-gradient-to-br from-red-600 to-red-500 text-white px-3 py-1 rounded hover:brightness-110 transition-all duration-200 font-oxygen flex items-center gap-2"
                    >
                      <FaTrash className="w-4 h-4" /> {/* Delete Icon */}
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default MyListings;
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useParams } from "react-router-dom"; // Import useParams
// import { spiral } from "ldrs";
// spiral.register();

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// const MyListings = () => {
//   const { userId } = useParams(); // Get userId from URL parameters
//   const [listings, setListings] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Fetch listings when the component mounts or userId changes
//   useEffect(() => {
//     if (userId) {
//       fetchListings();
//     }
//   }, [userId]); // Add userId as a dependency

//   // Function to fetch listings
//   const fetchListings = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `${API_URL}/api/listings/users/${userId}/listings`, // Use userId from URL
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
//         }
//       );
//       setListings(response.data.data);
//       setError("");
//     } catch (err) {
//       setError("Failed to fetch listings. Please try again.");
//       console.error("Error fetching listings:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to delete a listing
//   const handleDeleteListing = async (listingId) => {
//     try {
//       const response = await axios.delete(
//         `${API_URL}/api/listings/deletelist/${listingId}`,
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
//         }
//       );
//       console.log("Listing deleted:", response.data);
//       setListings(listings.filter((listing) => listing._id !== listingId));
//     } catch (err) {
//       setError("Failed to delete listing. Please try again.");
//       console.error("Error deleting listing:", err);
//     }
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <l-spiral size="40" speed="0.9" color="blue"></l-spiral>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 dark:gray-900 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6">My Listings</h1>

//       {/* Error Message */}
//       {error && <p className="text-red-500 mb-4">{error}</p>}

//       {/* Add Listing Button */}
//       <div className="mb-6">
//         <Link
//           to="/addlisting"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Add New Listing
//         </Link>
//       </div>

//       {/* Listings List */}
//       <div>
//         {listings.length === 0 ? (
//           <p>
//             No listings found.{" "}
//             <Link to="/add-listing" className="text-blue-500">
//               Add your first listing!
//             </Link>
//           </p>
//         ) : (
//           <div className="space-y-4">
//             {listings.map((listing) => (
//               <div
//                 key={listing._id}
//                 className="p-4 border rounded bg-white shadow-sm"
//               >
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h2 className="text-xl font-semibold">{listing.title}</h2>
//                     <p className="text-gray-600">{listing.description}</p>
//                     <p className="text-sm text-gray-500">
//                       Price: ${listing.price}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       Created At: {new Date(listing.createdAt).toLocaleString()}
//                     </p>
//                   </div>
//                   <div className="flex space-x-2">
//                     {/* Edit Button */}
//                     <Link
//                       to={`/updatelist/${listing._id}`}
//                       className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                     >
//                       Edit
//                     </Link>
//                     {/* Delete Button */}
//                     <button
//                       onClick={() => handleDeleteListing(listing._id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyListings;