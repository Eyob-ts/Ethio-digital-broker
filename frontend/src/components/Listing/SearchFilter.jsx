import React, { useState } from "react";

const SearchFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    title: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    condition: "",
    model: "",
    year: "",
    fuel: "",
    transmission: "",
    location: "",
    type: "",
    status: "",
    listingType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters); // Pass filters to parent component
  };

  const handleReset = () => {
    setFilters({
      title: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      condition: "",
      model: "",
      year: "",
      fuel: "",
      transmission: "",
      location: "",
      type: "",
      status: "",
      listingType: "",
    });
    onFilterChange({}); // Clear filters in parent component
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Search Input at the Top */}
        <div className="relative">
          <input
            type="text"
            name="title"
            placeholder="Search by title..."
            value={filters.title}
            onChange={handleChange}
            className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="w-5 h-5 text-gray-400 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
        </div>

        {/* Filter Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Category */}
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Category</option>
            <option value="Car">Car</option>
            <option value="House">House</option>
            <option value="Service">Service</option>
          </select>

          {/* Min Price */}
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleChange}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Max Price */}
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleChange}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Fuel Type */}
          <select
            name="fuel"
            value={filters.fuel}
            onChange={handleChange}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Electric">Electric</option>
          </select>

          {/* Transmission */}
          <select
            name="transmission"
            value={filters.transmission}
            onChange={handleChange}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Transmission</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>

          {/* Location */}
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={filters.location}
            onChange={handleChange}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Year */}
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={filters.year}
            onChange={handleChange}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="w-full bg-gray-400 text-white p-3 rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchFilter;