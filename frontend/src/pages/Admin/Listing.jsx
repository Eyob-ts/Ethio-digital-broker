import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // For API calls
import { motion } from "framer-motion"; // Import Framer Motion
import { spiral } from "ldrs";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all listings
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/admin/listings`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setListings(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch listings.");
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <l-spiral size="40" speed="0.9" color="blue"></l-spiral>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500 font-oxygen">
        {error}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-50 min-h-screen"
    >
      <h1 className="text-3xl font-bold mb-8 font-robotoSlab text-gray-800">
        Listings
      </h1>

      {/* Listing Table */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="overflow-x-auto bg-white rounded-lg shadow-md"
      >
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold font-oxygen text-gray-700 uppercase border-b">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold font-oxygen text-gray-700 uppercase border-b">
                Description
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold font-oxygen text-gray-700 uppercase border-b">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold font-oxygen text-gray-700 uppercase border-b">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {listings.map((listing, index) => (
              <motion.tr
                key={listing._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-oxygen text-gray-800">
                  {listing.title}
                </td>
                <td className="px-6 py-4 text-sm font-oxygen text-gray-600">
                  {listing.description}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-robotoMono ${
                      listing.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : listing.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {listing.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <Link
                    to={`/admin/listings/${listing._id}`}
                    className="text-blue-500 hover:text-blue-600 font-oxygen transition-colors"
                  >
                    View Details
                  </Link>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div> 
    </motion.div>
  );
};

export default Listings;

//todo import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { spiral } from 'ldrs'; // Import the spiral loader

// // Register the spiral loader
// spiral.register();

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// const Listings = () => {
//   const [listings, setListings] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchListings = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/api/admin/listings`);
//         setListings(response.data);
//       } catch (error) {
//         setError(error.message);
//         setError("Failed to fetch listings. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchListings();
//   }, []);

//   // Filter listings based on search query and status filter
//   const filteredListings = listings.filter((listing) => {
//     const matchesSearch =
//       listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       listing.description.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesStatus =
//       statusFilter === "all" || listing.status === statusFilter;

//     return matchesSearch && matchesStatus;
//   });

//   const handleDeleteListing = async (listingId) => {
//     if (window.confirm("Are you sure you want to delete this listing?")) {
//       try {
//         await axios.delete(`${API_URL}/api/admin/listings/${listingId}`);
//         setListings(listings.filter((listing) => listing._id !== listingId)); // Remove the listing from the list
//       } catch (error) {
//         setError(error.message);
//         setError("Failed to delete listing. Please try again later.");
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         {/* Replace the existing spinner with l-spiral */}
//         <l-spiral
//           size="40"
//           speed="0.9"
//           color="gray"
//         ></l-spiral>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 text-red-500 text-center">
//         <p>{error}</p>
//         <button
//           onClick={() => window.location.reload()}
//           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">Listings Management</h1>

//         {/* Search and Filter */}
//         <div className="flex flex-col md:flex-row gap-4 mb-8">
//           <input
//             type="text"
//             placeholder="Search by title or description"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           >
//             <option value="all">All Statuses</option>
//             <option value="pending">Pending</option>
//             <option value="approved">Approved</option>
//             <option value="rejected">Rejected</option>
//           </select>
//         </div>

//         {/* Listings Table */}
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Title
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Description
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredListings.map((listing) => (
//                 <tr key={listing._id}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {listing.title}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     {listing.description}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                         listing.status === "approved"
//                           ? "bg-green-100 text-green-800"
//                           : listing.status === "rejected"
//                           ? "bg-red-100 text-red-800"
//                           : "bg-yellow-100 text-yellow-800"
//                       }`}
//                     >
//                       {listing.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <Link
//                       to={`/admin/listings/edit/${listing._id}`}
//                       className="text-blue-500 hover:text-blue-700 mr-4"
//                     >
//                       Edit
//                     </Link>
//                     <button
//                       onClick={() => handleDeleteListing(listing._id)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Listings;