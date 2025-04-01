import  { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom"; // For React Router v6

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const PaymentCallback = () => {
  const [searchParams] = useSearchParams(); // Extract query parameters
  const navigate = useNavigate(); // For navigation
  const [paymentStatus, setPaymentStatus] = useState(null); // Payment status (success/failure)
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error message

  useEffect(() => {
    const verifyPayment = async () => {
      const tx_ref = searchParams.get("tx_ref"); // Get the transaction reference from the URL

      if (!tx_ref) {
        setError("Transaction reference is missing.");
        setIsLoading(false);
        return;
      }

      try {
        // Call the backend to verify the payment
        const response = await axios.post(`${API_URL}/api/payment/verify`, { tx_ref }, {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        });

        if (response.data.status === "success") {
          setPaymentStatus("success"); // Payment was successful
        } else {
          setPaymentStatus("failed"); // Payment failed
        }
      } catch (err) {
        console.error("Payment verification error:", err);
        setError("Failed to verify payment. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  const handleReturnToListing = () => {
    navigate("/"); // Redirect to the home page or listing page
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Verifying payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-red-500 text-lg">{error}</p>
          <button
            onClick={handleReturnToListing}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Return to Listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        {paymentStatus === "success" ? (
          <>
            <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
            <p className="mt-2 text-gray-600">Thank you for your purchase.</p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-red-600">Payment Failed</h1>
            <p className="mt-2 text-gray-600">Please try again or contact support.</p>
          </>
        )}
        <button
          onClick={handleReturnToListing}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          Return to Listings
        </button>
      </div>
    </div>
  );
};

export default PaymentCallback;