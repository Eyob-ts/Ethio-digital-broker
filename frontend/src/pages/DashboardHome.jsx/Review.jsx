import { useState, useEffect } from "react";
import axios from "axios";
import { Star } from "lucide-react"; // Assuming you're using Lucide React for icons
import { motion } from "framer-motion"; // Import Framer Motion
import { spiral } from "ldrs";
spiral.register();

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = "6787885c42bc7e1e238447d9"; // Replace with the authenticated user's ID

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/listings/users/${userId}/received-reviews`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setReviews(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Failed to fetch reviews. Please try again.");
        setLoading(false);
      }
    };

    fetchReviews();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* Spiral Loader */}
        <l-spiral size="40" speed="0.9" color="blue"></l-spiral>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center font-oxygen">
        {error}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center text-gray-700 font-oxygen">
        No reviews received yet.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 bg-gray-50 dark:bg-gray-800 min-h-screen"
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white font-robotoSlab">
        Received Reviews
      </h1>
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <motion.div
            key={review._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill={i < review.rating ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-300 font-oxygen">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-200 font-oxygen">
              {review.comment}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-oxygen">
              Listing: {review.listingId.title} {/* Display the listing title */}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-oxygen">
              Reviewed by: {review.userId.name} {/* Display the reviewer's name */}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Review;
// import  { useState, useEffect } from "react";
// import axios from "axios";
// import { Star } from "lucide-react"; // Assuming you're using Lucide React for icons
// import { spiral } from "ldrs";
// spiral.register();

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// const Review = () => {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const userId = "6787885c42bc7e1e238447d9"; // Replace with the authenticated user's ID

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/api/listings/users/${userId}/received-reviews`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           },
//         });
//         setReviews(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching reviews:", error);
//         setError("Failed to fetch reviews. Please try again.");
//         setLoading(false);
//       }
//     };

//     fetchReviews();
//   }, [userId]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         {/* Spiral Loader */}
//         <l-spiral
//           size="40"
//           speed="0.9"
//           color="blue"
//         ></l-spiral>
//       </div>
//     );
//   }
//   if (error) {
//     return <div className="text-red-500">{error}</div>;
//   }

//   if (reviews.length === 0) {
//     return <div>No reviews received yet.</div>;
//   }

//   return (
//     <div className="p-8 bg-gray-50 black:bg-gray-800">
//       <h1 className="text-2xl font-bold mb-6">Received Reviews</h1>
//       <div className="space-y-6">
//         {reviews.map((review) => (
//           <div key={review._id} className="border-b border-gray-200 pb-4">
//             <div className="flex items-center gap-2 mb-2">
//               <div className="flex">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`w-4 h-4 ${
//                       i < review.rating ? "text-yellow-400" : "text-gray-300"
//                     }`}
//                     fill={i < review.rating ? "currentColor" : "none"}
//                   />
//                 ))}
//               </div>
//               <span className="text-sm text-gray-600">
//                 {new Date(review.createdAt).toLocaleDateString()}
//               </span>
//             </div>
//             <p className="text-gray-700">{review.comment}</p>
//             <p className="text-sm text-gray-500">
//               Listing: {review.listingId.title} {/* Display the listing title */}
//             </p>
//             <p className="text-sm text-gray-500">
//               Reviewed by: {review.userId.name} {/* Display the reviewer's name */}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Review;