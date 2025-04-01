import React from "react";
import { IoClose } from "react-icons/io5"; // For closing icon

const FilterSidebar = ({ filters, onFilterChange, onClose }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose(); // Close the sidebar after submitting
  };

  const handleReset = () => {
    onFilterChange({
      title: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      fuel: "",
      transmission: "",
      location: "",
      year: "",
    });
  };

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 p-4">
      <button onClick={onClose} className="absolute top-4 right-4">
        <IoClose size={24} />
      </button>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Include all filter fields from your SearchFilter component here */}
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Search by title..."
            value={filters.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          {/* Add similar inputs for category, price, fuel, etc. */}
          <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg">Apply Filters</button>
          <button type="button" onClick={handleReset} className="w-full bg-gray-400 text-white p-3 rounded-lg">Reset</button>
        </div>
      </form>
    </div>
  );
};

export default FilterSidebar;
