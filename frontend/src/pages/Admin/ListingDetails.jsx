import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion"; // Import Framer Motion
import { spiral } from "ldrs";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const ListingDetails = () => {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch listing details
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/admin/listings/${listingId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        });
        console.log("API Response:", response.data); // Log the entire response
        setListing(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch listing details.");
        setLoading(false);
      }
    };

    fetchListing();
  }, [listingId]);

  // Handle status update
  const handleStatusUpdate = async (status) => {
    try {
      // Make a PUT request to update the verification status
      await axios.put(
        `${API_URL}/api/admin/listings/${listingId}/verify-owner/status`,
        { status }, // Send the new status in the request body
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        }
      );

      alert(`Status updated to ${status}.`);
      navigate("/admin/listings"); // Redirect back to listings page
    } catch (err) {
      alert("Failed to update status.");
      console.error("Error updating status:", err);
    }
  };

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
        Listing Details
      </h1>

      {/* Listing Information */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md mb-8"
      >
        <h2 className="text-2xl font-semibold font-oxygen text-gray-800 mb-4">
          {listing.title}
        </h2>
        <p className="text-gray-600 font-robotoMono">{listing.description}</p>
      </motion.div>

      {/* Verification Documents */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md mb-8"
      >
        <h3 className="text-xl font-semibold font-oxygen text-gray-800 mb-4">
          Verification Documents
        </h3>
        {listing.verificationDocuments && listing.verificationDocuments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {listing.verificationDocuments.map((doc, index) => (
              <motion.div
                key={doc._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                className="border p-4 rounded-lg hover:shadow-lg transition-shadow"
              >
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline font-robotoMono"
                >
                  View Document {index + 1}
                </a>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 font-robotoMono">No verification documents found.</p>
        )}
      </motion.div>

      {/* Status Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="flex gap-4"
      >
        <button
          onClick={() => handleStatusUpdate("approved")}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-oxygen"
        >
          Approve
        </button>
        <button
          onClick={() => handleStatusUpdate("rejected")}
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-oxygen"
        >
          Reject
        </button>
        <button
          onClick={() => handleStatusUpdate("pending")}
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors font-oxygen"
        >
          Set to Pending
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ListingDetails;