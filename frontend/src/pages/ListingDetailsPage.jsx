import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ListingDetails from "../components/Listing/ListingDetails";

const ListingDetailsPage = () => {
  const { id } = useParams(); // Get the listing ID from the URL
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/listings/getbyid/${id}`);
        console.log("API Response:", response.data); // Debugging: Log the API response

        // Check if the response has the expected structure
        if (response.data) {
          setListing(response.data); // Update this line based on the backend response
        } else {
          setError("Listing not found.");
        }
      } catch (err) {
        console.error("API Error:", err); // Debugging: Log the error
        setError("Failed to fetch listing details.");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  // Debugging: Log the listing object
  console.log("Listing Object:", listing);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!listing) return <div>Listing not found.</div>;

  return <ListingDetails listing={listing} />;
};

export default ListingDetailsPage;