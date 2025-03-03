


import { Link } from "react-router-dom"; // For navigation
import { Heart, MapPin, Star } from "lucide-react"; // Icons

const ListingCard = ({ listing }) => {
  const {
    _id,
    title,
    price,
    location,
    category,
    condition,
    model,
    year,
    fuel,
    transmission,
    images,
    listingType,
    type, // House-specific field
    rating = 0, // Default value for rating
    totalReviews = 0, // Default value for total reviews
  } = listing;

  // Debugging: Check the listing object
  console.log("Listing Data:", listing);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border dark:border-gray-700">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={images[0]?.url || "https://via.placeholder.com/400"} // Use the first image as the thumbnail
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400"; // Fallback image
          }}
        />
        {/* Listing Type Badge */}
        {listingType && (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-sm px-2 py-1 rounded">
            {listingType === "Rent" ? "For Rent" : "For Sale"}
          </span>
        )}
        {/* Multiple Images Indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
            {images.length}+ Photos
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h2>
        <p className="text-lg text-blue-600 dark:text-blue-400 font-bold mb-2">ETB {price}</p>

        {/* Rating Section */}
        <div className="flex items-center gap-1 mb-2 text-sm text-gray-600 dark:text-gray-300">
          <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
          <span>
            {rating} ({totalReviews})
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{location}</span>
        </div>

        {/* Dynamic Fields Based on Category */}
        <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
          <span>{category}</span>

          {/* Car-Specific Fields */}
          {category === "Car" && (
            <>
              {condition && <span>• {condition}</span>}
              {model && <span>• {model}</span>}
              {year && <span>• {year}</span>}
              {fuel && <span>• {fuel}</span>}
              {transmission && <span>• {transmission}</span>}
            </>
          )}

          {/* House-Specific Fields */}
          {category === "House" && (
            <>
              {type && <span>• {type}</span>}
            </>
          )}
        </div>

        {/* Actions Section */}
        <div className="flex justify-between items-center">
          <Link
            to={`/listings/getbyid/${_id}`} // Link to the details page
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            View Details
          </Link>
          <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;

