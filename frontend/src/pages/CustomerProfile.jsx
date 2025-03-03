import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { updateUser as updateUserAction } from '../redux/authSlice';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";


const CustomerProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '', 
    password: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch current profile data
    const fetchProfile = async () => {
      try {
        // Retrieve token from localStorage or sessionStorage (or wherever you're storing it)
        const token = localStorage.getItem('authToken'); // Change this according to where you store the token
    
        // Make the API request with the token in the headers
        const response = await axios.get(`${API_URL}/api/auth/get-profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
    
        if (response.data.success) {
          const profileData = response.data.user;
          setFormData({
            name: profileData.name || '',
            email: profileData.email || '',
            phone: profileData.phone || '',
            password: ''
          });
          // Update Redux state
          dispatch(updateUserAction(profileData));
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch profile data');
      }
    };
    

    fetchProfile();
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const token = localStorage.getItem('authToken'); // Retrieve token from storage
  
      const response = await axios.put(
        `${API_URL}/api/auth/profile`,
        {
          name: formData.name,
          phone: formData.phone,
          password: formData.password || undefined // Only send if password is provided
        },
        {
          headers: { Authorization: `Bearer ${token}` } // Add Authorization header
        }
      );
  
      if (response.data.success) {
        dispatch(updateUserAction(response.data.user));
        toast.success('Profile updated successfully');
        setIsEditing(false);
        setFormData(prev => ({ ...prev, password: '' })); // Clear password field
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating profile');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Profile Settings</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Basic Information</h3>
            
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <FaUser className="w-8 h-8 text-gray-400" />
              </div>
              
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Edit Profile
                </button>
              ) : null}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="pl-10 w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled={true} // Email cannot be changed
                    className="pl-10 w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="pl-10 w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Password Section - Only shown when editing */}
          {isEditing && (
            <div className="space-y-4 border-t pt-4">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Change Password</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Leave blank to keep current password"
                      className="pl-10 w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex justify-end space-x-4 border-t pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  // Reset form to current user data
                  setFormData({
                    name: user.name || '',
                    email: user.email || '',
                    phone: user.phone || '',
                    password: ''
                  });
                }}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100 transition-colors dark:text-gray-300 dark:hover:bg-gray-700"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CustomerProfile;
