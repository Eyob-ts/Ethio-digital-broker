import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { spiral } from "ldrs";
spiral.register();

const EditUser = () => {
  const { userId } = useParams(); // Get the user ID from the URL
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", role: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/admin/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        setError(error.message);
        setError("Failed to fetch user details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/api/admin/users/edit/${userId}`, user);
      navigate("/admin/users"); // Redirect to the user management page
    } catch (error) {
        setError(error.message);
        
      setError("Failed to update user. Please try again later.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* Spiral Loader */}
        <l-spiral
          size="40"
          speed="0.9"
          color="blue"
        ></l-spiral>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit User</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditUser;