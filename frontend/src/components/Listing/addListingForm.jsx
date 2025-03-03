import { useState } from "react";
import { Camera, FileText, DollarSign, Info, Check } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import { spiral } from "ldrs";
spiral.register();

const CreateListing = () => {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    condition: "",
    model: "",
    year: "",
    fuel: "",
    transmission: "",
    location: "",
    type: "",
    status: "pending", // Default status set to "pending"
    listingType: "", // Added listingType
  });

  const [images, setImages] = useState([]);
  const [verificationFiles, setVerificationFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleVerificationFileChange = (e) => {
    setVerificationFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate required fields
    if (!formData.category || !formData.title || !formData.description || !formData.listingType) {
      toast.error("Category, title, description, and listing type are required.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const dataToSend = new FormData();

      // Append all form data
      Object.entries(formData).forEach(([key, value]) => {
        dataToSend.append(key, value);
      });

      // Append images
      if (images && images.length > 0) {
        Array.from(images).forEach((image) => {
          dataToSend.append("images", image);
        });
      }

      // Append verification files
      if (verificationFiles && verificationFiles.length > 0) {
        Array.from(verificationFiles).forEach((file) => {
          dataToSend.append("verificationFiles", file);
        });
      }

      // Use environment variable for API URL
      const response = await axios.post("http://localhost:3000/api/listings", dataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("The add listing response is:", response);

      // Show success toast
      toast.success("Listing created successfully! It will be visible after admin approval.");

      // Reset form and navigate
      setFormData({
        category: "",
        title: "",
        description: "",
        price: "",
        condition: "",
        model: "",
        year: "",
        fuel: "",
        transmission: "",
        location: "",
        type: "",
        status: "pending",
        listingType: "",
      });
      setImages([]);
      setVerificationFiles([]);

      // Navigate to home page
      navigate("/");
    } catch (err) {
      // Show error toast
      toast.error(err.response?.data?.error || "An error occurred while creating the listing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-6xl bg-white p-8 rounded-lg shadow-lg space-y-6"
      >
        <h1 className="text-3xl font-semibold text-gray-700 flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-500" />
          Add a New Listing
        </h1>

        {/* Category */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              <Info className="inline-block w-5 h-5 text-gray-500 mr-2" />
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Category</option>
              <option value="Car">Car</option>
              <option value="House">House</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              <FileText className="inline-block w-5 h-5 text-gray-500 mr-2" />
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              <FileText className="inline-block w-5 h-5 text-gray-500 mr-2" />
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              <DollarSign className="inline-block w-5 h-5 text-gray-500 mr-2" />
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Listing Type */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              <Info className="inline-block w-5 h-5 text-gray-500 mr-2" />
              Listing Type
            </label>
            <select
              name="listingType"
              value={formData.listingType}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Listing Type</option>
              <option value="Rent">Rent</option>
              <option value="Sell">Sell</option>
            </select>
          </div>
        </div>

        {/* Conditional Fields */}
        {formData.category === "Car" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Condition</label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Condition</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Model</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="Enter model"
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Year</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="Enter year"
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Fuel</label>
              <select
                name="fuel"
                value={formData.fuel}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Fuel</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Transmission</label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Transmission</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>
          </div>
        )}

        {formData.category === "House" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter location"
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Type</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
          </div>
        )}

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            <Camera className="inline-block w-5 h-5 text-gray-500 mr-2" />
            Upload Images (Max 5)
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            accept="image/*"
            max={5}
          />
        </div>

        {/* Verification Files */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            <FileText className="inline-block w-5 h-5 text-gray-500 mr-2" />
            Upload Verification Documents (PDF or Images)
          </label>
          <input
            type="file"
            multiple
            onChange={handleVerificationFileChange}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            accept=".pdf,image/*"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-br from-blue-900 to-blue-700 hover:scale-105 text-white py-2 rounded-md hover:brightness-110 flex items-center justify-center transition-all duration-200"
          disabled={loading}
        >
          {loading ? (
            <l-spiral size="20" speed="0.9" color="white"></l-spiral>
          ) : (
            "Add Listing"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateListing;
