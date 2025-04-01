import React, { useState } from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const SearchFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    title: "",
    category: "",
    minPrice: 0,
    maxPrice: 10000,
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

  const priceRangeLimits = {
    min: 0,
    max: 9000000000
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePriceChange = (value) => {
    setFilters(prev => ({
      ...prev,
      minPrice: value[0],
      maxPrice: value[1]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const handleReset = () => {
    setFilters({
      title: "",
      category: "",
      minPrice: priceRangeLimits.min,
      maxPrice: priceRangeLimits.max,
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
    onFilterChange({});
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
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
            <option value="">All Categories</option>
            <option value="Car">Car</option>
            <option value="House">House</option>
            <option value="Electronics">Electronics</option>
          </select>

          {/* Price Range Slider */}
          <div className="md:col-span-2 lg:col-span-1 space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Price Range: {formatCurrency(filters.minPrice)} - {formatCurrency(filters.maxPrice)}
            </label>
            <div className="px-4 py-2">
              <Slider
                range
                min={priceRangeLimits.min}
                max={priceRangeLimits.max}
                value={[filters.minPrice, filters.maxPrice]}
                onChange={handlePriceChange}
                allowCross={false}
                trackStyle={[{ backgroundColor: '#3b82f6', height: 6 }]}
                handleStyle={[
                  { 
                    backgroundColor: '#3b82f6',
                    borderColor: '#3b82f6',
                    width: 20,
                    height: 20,
                    marginTop: -7,
                    opacity: 1
                  },
                  { 
                    backgroundColor: '#3b82f6',
                    borderColor: '#3b82f6',
                    width: 20,
                    height: 20,
                    marginTop: -7,
                    opacity: 1
                  }
                ]}
                railStyle={{ 
                  backgroundColor: '#e5e7eb',
                  height: 6
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{formatCurrency(priceRangeLimits.min)}</span>
              <span>{formatCurrency(priceRangeLimits.max)}</span>
            </div>
          </div>

          {/* Other filters... */}
          <select
            name="condition"
            value={filters.condition}
            onChange={handleChange}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any Condition</option>
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>

          {/* Model */}
          <input
            type="text"
            name="model"
            placeholder="Model"
            value={filters.model}
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
            min="1900"
            max={new Date().getFullYear()}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Fuel Type */}
          <select
            name="fuel"
            value={filters.fuel}
            onChange={handleChange}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
          </select>

          {/* Transmission */}
          <select
            name="transmission"
            value={filters.transmission}
            onChange={handleChange}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any Transmission</option>
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