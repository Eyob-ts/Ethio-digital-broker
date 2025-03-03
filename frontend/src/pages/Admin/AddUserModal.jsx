import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion"; // Import Framer Motion
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaUserTag } from "react-icons/fa";

const AddUserModal = ({ setShowModal, fetchUsers }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "customer",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup", // Your signup endpoint
        formData
      );
      console.log(response.data);

      toast.success("User created successfully!");
      fetchUsers(); // Refresh the user list after successful registration
      setShowModal(false); // Close the modal
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register user");
      toast.error("Failed to create user!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center font-robotoSlab text-gray-800">
          Add New User
        </h2>
        {error && (
          <p className="text-red-500 mb-2 text-center font-oxygen">{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 font-oxygen">
              Name
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 pl-10 border rounded-md focus:ring-blue-500 focus:border-blue-500 font-oxygen"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 font-oxygen">
              Email
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 pl-10 border rounded-md focus:ring-blue-500 focus:border-blue-500 font-oxygen"
                required
              />
            </div>
          </div>

          {/* Phone Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 font-oxygen">
              Phone
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaPhone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 pl-10 border rounded-md focus:ring-blue-500 focus:border-blue-500 font-oxygen"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 font-oxygen">
              Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 pl-10 border rounded-md focus:ring-blue-500 focus:border-blue-500 font-oxygen"
                required
              />
            </div>
          </div>

          {/* Role Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 font-oxygen">
              Role
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUserTag className="h-5 w-5 text-gray-400" />
              </div>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full p-2 pl-10 border rounded-md focus:ring-blue-500 focus:border-blue-500 font-oxygen"
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors font-oxygen"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 ${
                loading ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600"
              } text-white rounded-md transition-colors font-oxygen`}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddUserModal;