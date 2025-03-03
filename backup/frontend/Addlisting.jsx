import { useState } from "react";
import axios from "axios";

const CreateListing = () => {
  const [formData, setFormData] = useState({
    category: "Car", // Default to Car for testing
    title: "Test Car Title",
    description: "A description for the test car.",
    price: "10000",
    condition: "Used", // Specific to Car
    model: "Test Model",
    year: "2022",
    fuel: "Petrol",
    transmission: "Automatic",
    location: "",
    type: "",
    status: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Normalize formData for Car
    const normalizedFormData = { ...formData };
    if (formData.category === "Car") {
      // Remove non-car-related fields
      delete normalizedFormData.location;
      delete normalizedFormData.type;
      delete normalizedFormData.status;
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post("http://localhost:3000/api/listings/", normalizedFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      setSuccess("Car listing created successfully!");
      setError("");
      setFormData({
        category: "Car",
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
        status: "",
      });
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred.");
      setSuccess("");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Create Car Listing</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full mt-1 border rounded-md p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full mt-1 border rounded-md p-2"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="condition" className="block text-sm font-medium">
            Condition
          </label>
          <input
            type="text"
            id="condition"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="w-full mt-1 border rounded-md p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="model" className="block text-sm font-medium">
            Model
          </label>
          <input
            type="text"
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="w-full mt-1 border rounded-md p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="year" className="block text-sm font-medium">
            Year
          </label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full mt-1 border rounded-md p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="fuel" className="block text-sm font-medium">
            Fuel Type
          </label>
          <input
            type="text"
            id="fuel"
            name="fuel"
            value={formData.fuel}
            onChange={handleChange}
            className="w-full mt-1 border rounded-md p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="transmission" className="block text-sm font-medium">
            Transmission
          </label>
          <input
            type="text"
            id="transmission"
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            className="w-full mt-1 border rounded-md p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Create Listing
        </button>
      </form>
    </div>
  );
};

export default CreateListing;
