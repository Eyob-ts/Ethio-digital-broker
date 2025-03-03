import Listing from "../models/listings.js" // Import the Listing model
import cloudinary from "../utils/cloudinary.js";
// Create a new listing
export const createListing = async (req, res) => {
  try {
    const { category, title, description, price, condition, model, year, fuel, transmission, location, type, status, images } = req.body;

    // Validate required fields
    if (!category || !title || !description  || images.length === 0) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }

    // Category-specific validation
    if (category === "Car" && (!condition || !model || !year || !fuel || !transmission)) {
      return res.status(400).json({ error: "Car-specific fields are missing" });
    } else if (category === "House" && (!price || !location || !type || !status)) {
      return res.status(400).json({ error: "House-specific fields are missing" });
    }

    // Upload image to Cloudinary
    
    // let cloudinaryResult;
    try {
      //cloudinaryResult = await cloudinary.uploader.upload(images, { folder: "listing" });
    } catch (error) {
      return res.status(500).json({ error: "Image upload failed" });
    }

    // Create listing
    const ownerId = req.user.id;
    const newListing = new Listing({
      category,
      title,
      description,
      price,
      condition,
      model,
      year,
      fuel,
      transmission,
      location,
      type,
      status,
      images: {
        public_id: cloudinaryResult.public_id,
        url: cloudinaryResult.secure_url,
      },
      ownerId,
    });

    const savedListing = await newListing.save();
    res.status(201).json({ success: true, data: savedListing });
  } catch (err) {
    console.error("Error creating listing:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Get all listings with optional filters
export const getListings = async (req, res) => {
  try {
    // Destructure query parameters
    const { category, minPrice, maxPrice, location, sortBy, page = 1, limit = 10 } = req.query;

    // Build the filter object based on the query parameters
    let filters = {};
    
    // Filter by category if provided
    if (category) {
      filters.category = category;
    }

    // Filter by price range if provided
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = minPrice;
      if (maxPrice) filters.price.$lte = maxPrice;
    }

    // Filter by location if provided
    if (location) {
      filters.location = { $regex: location, $options: "i" }; // Case-insensitive search
    }

    // Sorting logic (e.g., by price or date)
    let sortOptions = {};
    if (sortBy === "price") {
      sortOptions = { price: 1 }; // Ascending order of price
    } else if (sortBy === "date") {
      sortOptions = { createdAt: -1 }; // Descending order of creation date
    }

    // Pagination logic
    const skip = (page - 1) * limit;
    
    // Fetch listings based on the filters and pagination
    const listings = await Listing.find(filters)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // Return the listings
    res.status(200).json(listings);
  } catch (err) {
    console.error("Error fetching listings:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Get a listing by its ID
export const getListingById = async (req, res) => {
    const { id } = req.params;
    console.log("Looking for listing with ID:", id);  // Log the ID
  
    try {
      const listing = await Listing.findById(id);
      
      if (!listing) {
        return res.status(404).json({ error: "Listing not found." });
      }
      res.status(200).json(listing);
    } catch (error) {
      console.error("Error retrieving listing by ID:", error.message);
      res.status(500).json({ error: "Internal server error." });
    }
  };
  


// Update an existing listing
export const updateListing = async (req, res) => {
  const { listingId } = req.params; // Get the listingId from URL params
  const { category, title, description, price, condition, model, year, fuel, transmission, location, type, status, images } = req.body;
  
  try {
    // Find the listing by its ID
    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({ error: "Listing not found." });
    }

    // Check if the logged-in user is the owner of the listing
    if (listing.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ error: "You are not the owner of this listing." });
    }

    // Update the fields with the new data provided
    listing.category = category || listing.category;
    listing.title = title || listing.title;
    listing.description = description || listing.description;
    listing.price = price || listing.price;
    listing.condition = condition || listing.condition;
    listing.model = model || listing.model;
    listing.year = year || listing.year;
    listing.fuel = fuel || listing.fuel;
    listing.transmission = transmission || listing.transmission;
    listing.location = location || listing.location;
    listing.type = type || listing.type;
    listing.status = status || listing.status;
    listing.images = images || listing.images;

    // Save the updated listing
    const updatedListing = await listing.save();

    // Return the updated listing
    res.status(200).json(updatedListing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

  

// Delete a listing
// Assuming `Listing` is your Mongoose model
export const deleteListing = async (req, res) => {
  const { listingId } = req.params;

  try {
    // Find the listing by ID
    const listing = await Listing.findById(listingId); 

    if (!listing) {
      return res.status(404).json({ error: "Listing not found." });
    }

    // Check if the user is the owner or admin
    if (listing.ownerId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: "You are not authorized to delete this listing." });
    }

    // Delete the listing
    await Listing.findByIdAndDelete(listingId);

    // Send success response
    res.status(200).json({ message: "Listing deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};



// Search and filter listings
export const searchListings = async (req, res) => {
  try {
    const { title, category, minPrice, maxPrice } = req.query;

    // Validate query parameters
    if (minPrice && Number(minPrice) < 0) {
      return res.status(400).json({ message: 'minPrice cannot be negative' });
    }

    if (maxPrice && Number(maxPrice) < 0) {
      return res.status(400).json({ message: 'maxPrice cannot be negative' });
    }

    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
      return res.status(400).json({ message: 'minPrice cannot be greater than maxPrice' });
    }

    // Build dynamic query
    const query = {};

    if (title) query.title = { $regex: title, $options: 'i' }; // Case-insensitive search
    if (category) query.category = category;
    if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) }; // Greater than or equal
    if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) }; // Less than or equal

    const listings = await Listing.find(query);

    res.status(200).json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};
