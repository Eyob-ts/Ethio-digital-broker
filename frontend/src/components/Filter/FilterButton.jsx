import React from "react";
import { FaFilter } from "react-icons/fa"; // Filter icon

const FilterButton = ({ onOpen }) => {
  return (
    <button
      onClick={onOpen}
      className="p-3 bg-blue-500 text-white rounded-full fixed top-4 right-4 z-50"
    >
      <FaFilter size={24} />
    </button>
  );
};

export default FilterButton;
