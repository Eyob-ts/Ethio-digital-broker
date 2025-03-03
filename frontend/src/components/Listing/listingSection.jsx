import { useEffect, useState } from "react";
import axios from "axios";
import ListingCard from "./listingCards";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import SearchFilter from "./SearchFilter";

const ListingSection = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  const apiUrl = "http://localhost:3000/api/listings/search-filter"; // Fixed API URL

  const fetchFilteredListings = async () => {
    try {
      const response = await axios.get(apiUrl, {
        params: {
          title: filters.title || "",
          category: filters.category || "",
          minPrice: filters.minPrice || "",
          maxPrice: filters.maxPrice || "",
          condition: filters.condition || "",
          model: filters.model || "",
          year: filters.year || "",
          fuel: filters.fuel || "",
          transmission: filters.transmission || "",
          location: filters.location || "",
          type: filters.type || "",
          status: filters.status || "",
          listingType: filters.listingType || "",
        },
      });

      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to fetch listings.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchFilteredListings();
        setListings(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="border dark:border-gray-700 rounded-lg p-4 shadow-lg bg-white dark:bg-gray-800"
          >
            <Skeleton
              height={200}
              baseColor={isDarkMode ? "#1F2937" : "#E5E7EB"}
              highlightColor={isDarkMode ? "#374151" : "#F3F4F6"}
            />
            <Skeleton
              height={20}
              className="mt-4"
              baseColor={isDarkMode ? "#1F2937" : "#E5E7EB"}
              highlightColor={isDarkMode ? "#374151" : "#F3F4F6"}
            />
            <Skeleton
              height={15}
              count={2}
              className="mt-2"
              baseColor={isDarkMode ? "#1F2937" : "#E5E7EB"}
              highlightColor={isDarkMode ? "#374151" : "#F3F4F6"}
            />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center p-10">
        <span className="text-red-600 dark:text-red-400">{error}</span>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400"
        >
          Retry
        </button>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center p-10">
        <span className="text-gray-900 dark:text-gray-100">No listings available</span>
        <a
          href="/create-listing"
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400"
        >
          Post Your Listing
        </a>
      </div>
    );
  }

  return (
    <div className="my-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Our Listings
      </h2>
      <SearchFilter onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listings.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default ListingSection;


// import { useEffect, useState } from "react";
// import axios from "axios";
// import ListingCard from "./listingCards";
// import Skeleton from "react-loading-skeleton"; // Install this library for skeleton loading
// import "react-loading-skeleton/dist/skeleton.css";
// import { useSelector } from "react-redux"; // Import useSelector to get dark mode state

// const ListingSection = () => {
//   const [listings, setListings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const isDarkMode = useSelector((state) => state.theme.darkMode); // Get dark mode state

//   const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

//   const fetchListings = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await axios.get(`${apiUrl}/api/listings/filter`);
      
//       // Ensure `setListings` receives an array
//       if (response.data.success && Array.isArray(response.data.data)) {
//         setListings(response.data.data);
//       } else {
//         setListings([]); // Fallback to empty array
//       }
//     } catch (error) {
//       setError(error.message);
//       setError("Error fetching listings. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   useEffect(() => {
//     fetchListings();
//   }, []);

//   if (loading) {
//     return (
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
//         {[...Array(8)].map((_, index) => (
//           <div key={index} className="border dark:border-gray-700 rounded-lg p-4 shadow-lg bg-white dark:bg-gray-800">
//             <Skeleton 
//               height={200} 
//               baseColor={isDarkMode ? "#1F2937" : "#E5E7EB"}
//               highlightColor={isDarkMode ? "#374151" : "#F3F4F6"}
//             />
//             <Skeleton 
//               height={20} 
//               className="mt-4" 
//               baseColor={isDarkMode ? "#1F2937" : "#E5E7EB"}
//               highlightColor={isDarkMode ? "#374151" : "#F3F4F6"}
//             />
//             <Skeleton 
//               height={15} 
//               count={2} 
//               className="mt-2" 
//               baseColor={isDarkMode ? "#1F2937" : "#E5E7EB"}
//               highlightColor={isDarkMode ? "#374151" : "#F3F4F6"}
//             />
//           </div>
//         ))}
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col justify-center items-center p-10">
//         <span className="text-red-600 dark:text-red-400">{error}</span>
//         <button
//           onClick={fetchListings}
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   if (listings.length === 0) {
//     return (
//       <div className="flex flex-col justify-center items-center p-10">
//         <span className="text-gray-900 dark:text-gray-100">No listings available</span>
//         <a
//           href="/create-listing"
//           className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400"
//         >
//           Post Your Listing
//         </a>
//       </div>
//     );
//   }

//   return (
//     <div className="my-12 px-6">
//       <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Our Listings</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {listings.map((listing) => (
//           <ListingCard key={listing._id} listing={listing} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ListingSection;

