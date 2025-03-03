import { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setListing, setLoading, setError } from "../redux/listingSlice";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const EditCustomerList = () => {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get state from Redux store
  const { listing, loading, error } = useSelector((state) => state.listing);

  useEffect(() => {
    if (!listingId) {
      dispatch(setError("Invalid listing ID."));
      return;
    }

    const fetchListing = async () => {
      try {
        dispatch(setLoading(true));
        const response = await axios.get(`${API_URL}/api/listings/getbyid/${listingId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        });
        console.log("Fetched listing data:", response.data);
        dispatch(setListing(response.data));
        dispatch(setError(""));
      } catch (err) {
        dispatch(setError("Failed to fetch listing. Please try again."));
        console.error("Error fetching listing:", err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchListing();
  }, [listingId, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setListing({ ...listing, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const response = await axios.put(
        `${API_URL}/api/listings/updatelist/${listingId}`,
        listing,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        }
      );
      console.log("Listing updated:", response.data);
      navigate("/customer/my-listing"); // Redirect after successful update
    } catch (err) {
      dispatch(setError("Failed to update listing. Please try again."));
      console.error("Error updating listing:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Edit Listing</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={listing.title || ""}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={listing.description || ""}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
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
