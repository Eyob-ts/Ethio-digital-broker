

const SearchBar = () => {
  return (
    <div className="flex justify-center items-center p-4 bg-gray-100">
      <div className="flex items-center space-x-4 bg-white rounded-lg shadow-lg p-4">
        <select className="border border-gray-300 rounded-md p-2">
          <option>All</option>
          <option>New Car</option>
          <option>Used Car</option>
        </select>
        <select className="border border-gray-300 rounded-md p-2">
          <option>Make</option>
          <option>Toyota</option>
          <option>Honda</option>
        </select>
        <select className="border border-gray-300 rounded-md p-2">
          <option>Model</option>
          <option>Model 1</option>
          <option>Model 2</option>
        </select>
        <select className="border border-gray-300 rounded-md p-2">
          <option>Door</option>
          <option>2 Door</option>
          <option>4 Door</option>
        </select>
        <select className="border border-gray-300 rounded-md p-2">
          <option>Body</option>
          <option>Sedan</option>
          <option>SUV</option>
        </select>
        <button className="bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-orange-600">
          Find Cars <span role="img" aria-label="search">🔍</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;