import { useState } from "react";

const Sidebar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    condition: "",
    location: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Filter Listings
      </h3>
      <div className="space-y-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
            Category
          </label>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
            <option value="vehicles">Vehicles</option>
            {/* Add more categories here */}
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="flex space-x-2">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
              Min Price
            </label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
              placeholder="Min"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
              Max Price
            </label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
              placeholder="Max"
            />
          </div>
        </div>

        {/* Condition Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
            Condition
          </label>
          <select
            name="condition"
            value={filters.condition}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          >
            <option value="">Any Condition</option>
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            placeholder="Enter location"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
