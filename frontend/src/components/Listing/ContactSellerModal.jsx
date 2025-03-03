import  { useEffect, useState } from "react";
import axios from "axios";

const ContactSellerModal = ({ isOpen, onRequestClose, listing }) => {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen && listing?.ownerId) {
      fetchSellerPhoneNumber();
    }
  }, [isOpen, listing]);

  const fetchSellerPhoneNumber = async () => {
    const userToken = localStorage.getItem("token"); // 🔹 Retrieve token

    if (!userToken) {
      setError("You must be logged in to view the phone number.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/api/listing/${listing.ownerId}/phone`,
        {
          headers: { Authorization: `Bearer ${userToken}` }, // 🔹 Send token for authentication
        }
      );
      setPhoneNumber(response.data.phone);
      setError("");
    } catch (err) {
      setError("Failed to fetch phone number. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Contact Seller</h2>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : phoneNumber ? (
          <p className="text-lg font-semibold">📞 {phoneNumber}</p>
        ) : (
          <p>Loading phone number...</p>
        )}
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            onClick={onRequestClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactSellerModal;
