import  { useState, useEffect } from "react";
import { MapPin, Heart, Share, MessageCircle, Star, CreditCard } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ContactSellerModal from "./ContactSellerModal";
import axios from "axios";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const ListingDetails = ({ listing }) => {
  const {
    _id: listingId,
    title,
    description,
    price,
    location,
    category,
    condition,
    model,
    year,
    fuel,
    transmission,
    listingType,
    images,
  } = listing;

  // Access the user object from Redux state
  const user = useSelector((state) => state.auth.user);
  console.log("User from Redux:", user); // Debugging log

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/listings/${listingId}/reviews`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setReviews(response.data);

        // Calculate average rating
        const totalRating = response.data.reduce((sum, review) => sum + review.rating, 0);
        const avgRating = response.data.length > 0 ? totalRating / response.data.length : 0;
        setAverageRating(avgRating);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [listingId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (newComment.trim() === "" || userRating === 0) {
      alert("Please provide a rating and comment.");
      return;
    }

    try {
      // Prepare the review data
      const reviewData = {
        rating: userRating,
        comment: newComment,
      };

      // Send the review data to the backend
      const response = await axios.post(
        `${API_URL}/api/listings/${listingId}/reviews`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.status === 201) {
        // Success: Update the UI with the new review
        console.log("Review submitted successfully:", response.data);
        setNewComment(""); // Clear the comment input
        setUserRating(0); // Reset the rating

        // Refresh the reviews list
        const reviewsResponse = await axios.get(
          `${API_URL}/api/listings/${listingId}/reviews`,
          {
           headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          }
        );
        setReviews(reviewsResponse.data);

        // Recalculate average rating
        const totalRating = reviewsResponse.data.reduce((sum, review) => sum + review.rating, 0);
        const avgRating = reviewsResponse.data.length > 0 ? totalRating / reviewsResponse.data.length : 0;
        setAverageRating(avgRating);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    }
  };

  const handlePayment = async () => {
    setIsPaymentLoading(true);
  
    try {
      // Use the user's email or a fallback email
      const userEmail = user?.email || "jteshome5@gmail.com"; // Fallback email for testing
      console.log("User Email:", userEmail); // Debugging log
  
      // Prepare the payment payload
      const payload = {
        amount: price, // Price of the listing
        email: userEmail, // User's email (from Redux or fallback)
        currency: "ETB", // Currency (Ethiopian Birr)
        callback_url: `${API_URL}/api/payment-callback`, // Callback URL
      };
      console.log("Payment Payload:", payload); // Debugging log
  
      // Call the backend to initialize payment
      const response = await axios.post(
        `${API_URL}/api/payment/initialize`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      console.log("Full Backend Response:", response); // Debugging log
  
      // Extract the checkout URL from the simplified response
      const checkoutUrl = response.data.checkout_url;
      console.log("Checkout URL:", checkoutUrl); // Debugging log
  
      if (checkoutUrl) {
        // Open the Chapa payment page in a new tab
        window.open(checkoutUrl, "_blank");
      } else {
        console.error("Failed to initialize payment. Backend response:", response.data);
        alert("Failed to initialize payment. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      if (error.response) {
        console.error("Backend error response:", error.response.data);
      }
      alert("An error occurred while processing your payment.");
    } finally {
      setIsPaymentLoading(false);
    }
  };
  return ( 
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Image Carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          <div className="w-full">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={10}
              slidesPerView={1}
              className="rounded-lg overflow-hidden"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image.url}
                    alt={title}
                    className="w-full h-96 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400"; // Fallback image
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            <p className="text-2xl text-blue-600 font-bold">${price}</p>

            {/* Rating Section */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-5 h-5 ${
                      index < Math.floor(averageRating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill={index < Math.floor(averageRating) ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {averageRating.toFixed(1)} ({reviews.length} reviews)
              </span>
            </div>

            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-1" />
              <span>{location}</span>
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-gray-600">
              <span>{category}</span>
              {condition && <span>• {condition}</span>}
              {model && <span>• {model}</span>}
              {year && <span>• {year}</span>}
              {fuel && <span>• {fuel}</span>}
              {transmission && <span>• {transmission}</span>}
              {listingType && <span>• {listingType}</span>}
            </div>

            {/* Description */}
            <p className="text-gray-700">{description}</p>

            {/* Actions Section */}
            <div className="flex gap-4">
              <button
                onClick={openModal}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Message Seller
              </button>
              <button
                onClick={handlePayment}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-300 flex items-center"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Pay Now
              </button>
              <button className="p-2 text-gray-600 hover:text-red-500 transition-colors duration-300">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-500 transition-colors duration-300">
                <Share className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Comment Section */}
        <div className="p-8 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">User Reviews</h2>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-600">Your Rating:</span>
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-5 h-5 cursor-pointer ${
                      index < userRating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() => setUserRating(index + 1)}
                    fill={index < userRating ? "currentColor" : "none"}
                  />
                ))}
              </div>
            </div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your review..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
            <button
              type="submit"
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Submit Review
            </button>
          </form>

          {/* Display Reviews */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review._id} className="border-b border-gray-200 pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                        fill={i < review.rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Seller Modal */}
        <ContactSellerModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          listing={listing}
        />
      </div>
    </div>
  );
};

export default ListingDetails;