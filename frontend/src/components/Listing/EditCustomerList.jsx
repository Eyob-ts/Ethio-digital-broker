import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const EditCustomerList = () => {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!listingId) {
      setError("Invalid listing ID.");
      return;
    }

    const fetchListing = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/listings/getbyid/${listingId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        });
        console.log("Fetched listing data:", response.data); // Debugging line
        setFormData(response.data);
        setError("");
      } catch (err) {
        setError("Failed to fetch listing. Please try again.");
        console.error("Error fetching listing:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [listingId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        `${API_URL}/api/listings/updatelist/${listingId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        }
      );
      console.log("Listing updated:", response.data);
      navigate("/customer/my-listing"); // Redirect after successful update
    } catch (err) {
      setError("Failed to update listing. Please try again.");
      console.error("Error updating listing:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner
  }

  if (error) {
    return <div className="text-red-500">{error}</div>; // Show an error message
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Edit Listing</h1>

      {/* Edit Listing Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title || ""}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        {/* Add more fields as needed */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Updating..." : "Update Listing"}
        </button>
      </form>
    </div>
  );
};

export default EditCustomerList;