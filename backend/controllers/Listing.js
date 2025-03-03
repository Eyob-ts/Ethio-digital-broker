import Listing from "../models/listings.js"; 
import cloudinary from "../utils/cloudinary.js";
import Review from "../models/Review.js"; // Import the Review model
import mongoose from "mongoose";
import fs from 'fs'; // For file deletion after upload

import validator from 'validator';


export const createListing = async (req, res) => {
  try {
    const {
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
      listingType,
    } = req.body;

    // Validation for required fields
    if (!category || !title || !description || !listingType) {
      return res.status(400).json({ error: "Category, title, description, and listingType are required." });
    }

    // Validate listingType
    if (!["Rent", "Sell"].includes(listingType)) {
      return res.status(400).json({ error: "listingType must be either 'Rent' or 'Sell'." });
    }

    // Validate price (if provided)
    if (price && (isNaN(price) || price < 1000)) {
      return res.status(400).json({ error: "Price must be a valid positive number." });
    }

    // Category-specific validation
    if (category === "Car") {
      if (!condition || !model || !year || !fuel || !transmission) {
        return res.status(400).json({ error: "Car-specific fields (condition, model, year, fuel, transmission) are required." });
      }
      if (!validator.isInt(year.toString(), { min: 1900, max: new Date().getFullYear() })) {
        return res.status(400).json({ error: "Year must be a valid year between 1900 and the current year." });
      }
    }

    if (category === "House") {
      if (!price || !location || !type || !status) {
        return res.status(400).json({ error: "House-specific fields (price, location, type, status) are required." });
      }
    }

    // File validation
    const files = req.files || [];
    if (!files.images || files.images.length === 0) {
      return res.status(400).json({ error: "At least one image is required." });
    }

    // Validate image file types and sizes
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    for (const file of files.images) {
      if (!allowedImageTypes.includes(file.mimetype)) {
        return res.status(400).json({ error: "Invalid image file type. Only JPEG, PNG, and JPG are allowed." });
      }
      if (file.size > maxFileSize) {
        return res.status(400).json({ error: "Image file size exceeds the maximum limit of 5MB." });
      }
    }

    // Validate verification file types and sizes (if provided)
    if (files.verificationFiles) {
      const allowedVerificationTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      for (const file of files.verificationFiles) {
        if (!allowedVerificationTypes.includes(file.mimetype)) {
          return res.status(400).json({ error: "Invalid verification file type. Only PDF, JPEG, PNG, and JPG are allowed." });
        }
        if (file.size > maxFileSize) {
          return res.status(400).json({ error: "Verification file size exceeds the maximum limit of 5MB." });
        }
      }
    }

    // Upload listing images to Cloudinary
    const uploadedImages = [];
    for (const file of files.images) {
      try {
        const uploadResult = await cloudinary.uploader.upload(file.path, {
          folder: "listing",
        });
        uploadedImages.push({
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url,
        });
        fs.unlinkSync(file.path); // Delete the local file after upload
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        return res.status(500).json({ error: "Failed to upload listing image(s)." });
      }
    }

    // Upload verification documents to Cloudinary (if provided)
    const uploadedVerificationFiles = [];
    if (files.verificationFiles) {
      for (const file of files.verificationFiles) {
        try {
          const uploadResult = await cloudinary.uploader.upload(file.path, {
            folder: "verification",
            resource_type: file.mimetype === "application/pdf" ? "raw" : "image",
          });
          uploadedVerificationFiles.push({
            public_id: uploadResult.public_id,
            url: uploadResult.secure_url,
          });
          fs.unlinkSync(file.path); // Delete the local file after upload
        } catch (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({ error: "Failed to upload verification document(s)." });
        }
      }
    }

    const ownerId = req.user._id; // User ID from authentication

    // Prepare the listing data
    const listingData = {
      category,
      title,
      description,
      images: uploadedImages,
      verificationDocuments: uploadedVerificationFiles,
      ownerId,
      price,
      location: category === "House" ? location : undefined,
      type: category === "House" ? type : undefined,
      status: category === "House" ? status : undefined,
      listingType,
      condition: category === "Car" ? condition : undefined,
      model: category === "Car" ? model : undefined,
      year: category === "Car" ? year : undefined,
      fuel: category === "Car" ? fuel : undefined,
      transmission: category === "Car" ? transmission : undefined,
    };

    // Remove undefined fields
    Object.keys(listingData).forEach((key) => {
      if (listingData[key] === undefined) delete listingData[key];
    });

    // Create and save the new listing
    const newListing = new Listing(listingData);
    const savedListing = await newListing.save();

    // Respond with the newly created listing
    res.status(201).json({ success: true, data: savedListing });
  } catch (err) {
    console.error("Error creating listing:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};


//?create listing
// export const createListing = async (req, res) => {
//   try {
//     const {
//       category,
//       title,
//       description, 
//       price,
//       condition,
//       model,
//       year,
//       fuel, 
//       transmission,
//       location,
//       type,
//       status, 
//       listingType, // Added listingType to the request body
//     } = req.body;

//     // Validation for required fields
//     if (!category || !title || !description || !listingType) {
//       return res
//         .status(400)
//         .json({ error: "Category, title, description, and listingType are required." });
//     }

//     // Validate listingType
//     if (!["Rent", "Sell"].includes(listingType)) {
//       return res.status(400).json({ error: "listingType must be either Rent or Sell." });
//     }

//     // Category-specific validation
//     if (category === "Car" && (!condition || !model || !year || !fuel || !transmission)) {
//       return res
//         .status(400)
//         .json({ error: "Car-specific fields are missing." });
//     }

//     if (category === "House" && (!price || !location || !type || !status)) {
//       return res
//         .status(400)
//         .json({ error: "House-specific fields are missing." });
//     } 


//     const uploadedImages = [];
//     const uploadedVerificationFiles = [];
//     const files = req.files || [];

//     if (!files || files.length === 0) {
//       return res.status(400).json({ error: "At least one image is required." });
//     }

//     // Upload listing images to Cloudinary
//     if (files.images) {
//       for (const file of files.images) {
//         try {
//           const uploadResult = await cloudinary.uploader.upload(file.path, {
//             folder: "listing",
//           });
//           uploadedImages.push({
//             public_id: uploadResult.public_id,
//             url: uploadResult.secure_url,
//           });
//           fs.unlinkSync(file.path); // Delete the local file after upload
//         } catch (error) {
//           console.error("Cloudinary upload error:", error);
//           return res.status(500).json({ error: "Failed to upload listing image(s)." });
//         }
//       }
//     }

//     // Upload verification documents to Cloudinary
//     if (files.verificationFiles) {
//       for (const file of files.verificationFiles) {
//         try {
//           const uploadResult = await cloudinary.uploader.upload(file.path, {
//             folder: "verification",
//             resource_type: file.mimetype === "application/pdf" ? "raw" : "image",
//           });
//           uploadedVerificationFiles.push({
//             public_id: uploadResult.public_id,
//             url: uploadResult.secure_url,
//           });
//           fs.unlinkSync(file.path); // Delete the local file after upload
//         } catch (error) {
//           console.error("Cloudinary upload error:", error);
//           return res.status(500).json({ error: "Failed to upload verification document(s)." });
//         }
//       }
//     } 

//     const ownerId = req.user._id; // User ID from authentication

//     // Prepare the listing data 
//     const listingData = { 
//       category, 
//       title,
//       description,
//       images: uploadedImages, 
//       verificationDocuments: uploadedVerificationFiles, // Add verification documents
//       ownerId,
//       price,
//       location: category === "House" ? location : undefined,
//       type: category === "House" ? type : undefined,
//       status: category === "House" ? status : undefined,
//       listingType, // Added listingType here
//       condition: category === "Car" ? condition : undefined,
//       model: category === "Car" ? model : undefined,
//       year: category === "Car" ? year : undefined,
//       fuel: category === "Car" ? fuel : undefined,
//       transmission: category === "Car" ? transmission : undefined,
//     };

//     // Remove undefined fields
//     Object.keys(listingData).forEach((key) => {
//       if (listingData[key] === undefined) delete listingData[key];
//     });

//     // Create and save the new listing
//     const newListing = new Listing(listingData);
//     const savedListing = await newListing.save();

//     // Respond with the newly created listing
//     res.status(201).json({ success: true, data: savedListing });
//   } catch (err) {
//     console.error("Error creating listing:", err);
//     res.status(500).json({ error: "Internal server error." });
//   }
// };



// Get listings by user ID


// Get listings by user ID
export const getListingsByUserId = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID." });
    }

    const listings = await Listing.find({ ownerId: userId });

    if (!listings || listings.length === 0) {
      return res.status(404).json({ success: false, message: "No listings found for this user." });
    }

    res.status(200).json({ success: true, data: listings });
  } catch (error) {
    console.error("Error fetching listings by user ID:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  } 
};
//! Get listings by user ID
// export const getListingsByUserId = async (req, res) => {
//   try {
//     // Extract the user ID from the request (e.g., from auth middleware or params)
//     const userId = req.user._id; // Assuming the user ID is stored in req.user after authentication

//     // Find all listings where the ownerId matches the user ID
//     const listings = await Listing.find({ ownerId: userId });

//     // If no listings are found, return a 404 response
//     if (!listings || listings.length === 0) {
//       return res.status(404).json({ message: "No listings found for this user." });
//     }

//     // Return the listings as a response
//     res.status(200).json({ success: true, data: listings });
//   } catch (error) {
//     // Handle any errors
//     console.error("Error fetching listings by user ID:", error);
//     res.status(500).json({ success: false, message: "Internal server error." });
//   }
// };



export const filterListings = async (req, res) => {
  try {
    const query = {}; // Empty query object to store conditions

    if (req.query.title) {
      query.title = { $regex: req.query.title, $options: "i" }; // Case-insensitive search
    }

    if (req.query.category) {
      query.category = req.query.category;
    }

    if (req.query.minPrice && req.query.maxPrice) {
      query.price = { $gte: parseFloat(req.query.minPrice), $lte: parseFloat(req.query.maxPrice) };
    } else if (req.query.minPrice) {
      query.price = { $gte: parseFloat(req.query.minPrice) };
    } else if (req.query.maxPrice) {
      query.price = { $lte: parseFloat(req.query.maxPrice) };
    }

    if (req.query.condition) {
      query.condition = req.query.condition;
    }

    if (req.query.model) {
      query.model = req.query.model;
    }

    if (req.query.year) {
      query.year = parseInt(req.query.year);
    }

    if (req.query.fuel) {
      query.fuel = req.query.fuel;
    }

    if (req.query.transmission) {
      query.transmission = req.query.transmission;
    }

    if (req.query.location) {
      query.location = { $regex: req.query.location, $options: "i" };
    }

    if (req.query.type) {
      query.type = req.query.type;
    }

    // ✅ Ensure only approved listings are shown unless another status is requested
    query.status = req.query.status ? req.query.status : "approved";

    if (req.query.status) {
      query.status = req.query.status;
    }

    const listings = await Listing.find(query);

    res.status(200).json({
      success: true,
      data: listings
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};


//! Get all listings with optional filters 
// export const getListings = async (req, res) => {
//   try {
//     const { title, category, minPrice, maxPrice, location, sortBy, page = 1, limit = 10 } = req.query;

//     // Build the filter object
//     let filters = { status: { $regex: "^Approved$", $options: "i" } }; // Case-insensitive match for "Approved"

//     if (category) filters.category = category;

//     if (minPrice || maxPrice) {
//       filters.price = {};
//       if (minPrice) filters.price.$gte = minPrice;
//       if (maxPrice) filters.price.$lte = maxPrice;
//     }

//     if (location) {
//       filters.location = { $regex: location, $options: "i" }; // Case-insensitive search
//     }

//     // Sorting logic
//     let sortOptions = {};
//     if (sortBy === "price") {
//       sortOptions.price = 1; // Ascending
//     } else if (sortBy === "date") {
//       sortOptions.createdAt = -1; // Descending
//     }

//     // Pagination
//     const skip = (page - 1) * limit;

//     // Fetch listings based on the filters
//     const listings = await Listing.find(filters)
//       .sort(sortOptions)
//       .skip(skip)
//       .limit(limit)
//       .select("category title price listingType location images model fuel transmission year type status createdAt");

//     // If no listings found, return an empty array
//     res.status(200).json({ success: true, data: listings });
//   } catch (err) {
//     console.error("Error fetching listings:", err);
//     res.status(500).json({ success: false, error: "Internal server error" });
//   }
// };



 
// Get a listing by its ID
export const getListingById = async (req, res) => {
  const { listingId } = req.params;
  console.log("Looking for listing with ID:", listingId); // Log the ID

  try {
    const listing = await Listing.findById(listingId);

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
  console.log("Looking for listing with ID:", listingId);
  try {
    // Find the listing by its ID
    const listing = await Listing.findById(listingId);
    console.log("Found listing:", listing); // Log the found listing

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



// todo Search and filter listings
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


export const getMyListings = async (req, res) => {
  try {
    const userId = req.user.ListingId; // Get the logged-in user's ID
    const listings = await Listing.find({ user: userId }); // Fetch listings for the user
    res.status(200).json({ data: listings });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch listings", details: err.message });
  }
};

 //! Import the Listing model
export const addReview = async (req, res) => {
  const { listingId } = req.params;
  const { rating, comment } = req.body;
  const userId = req.user._id; // Assuming req.user is populated by your authentication middleware

  try {
    // Validate input
    if (!rating || !comment) {
      return res.status(400).json({ error: "All review fields are required." });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5." });
    }

    // Find the listing
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found." });
    }

    // Create a new review
    const newReview = new Review({
      userId,
      listingId,
      rating,
      comment,
      status: "Pending" // or whatever default status you want to set
    });

    // Save the review
    await newReview.save();

    // Update the listing's average rating (optional)
    const reviews = await Review.find({ listingId });
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    listing.rating = totalRating / reviews.length;

    // Save the updated listing
    await listing.save();

    res.status(201).json(newReview);
  } catch (error) {
    console.error("Error adding review:", error.message || error);
    res.status(500).json({ error: error.message || "Internal server error." });
  }
};
//todo get reviews for a listing
export const getReviewsForListing = async (req, res) => {
  const { listingId } = req.params;

  try {
    // Find reviews for the listing
    const reviews = await Review.find({ listingId }).populate("userId", "name");

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const getReceivedReviews = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find listings owned by the user
    const listings = await Listing.find({ ownerId: userId }).select("_id");

    // Extract listing IDs
    const listingIds = listings.map((listing) => listing._id);

    // Find reviews for the listings
    const reviews = await Review.find({ listingId: { $in: listingIds } })
      .populate("listingId", "title") // Include the listing title
      .populate("userId", "name"); // Include the reviewer's name (optional)

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching received reviews:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};



export const verifyOwner = async (req, res) => {
  try {
    const { listingId } = req.params; // Get the listingId from URL params
    const files = req.files || []; // For handling multiple files (if any)

    if (files.length === 0) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    // Find the listing by its ID
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found." }); 
    }

    // Check if the logged-in user is the owner of the listing
    if (listing.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ error: "You are not the owner of this listing." });
    }

    const uploadedFiles = []; 

    // Loop through each file uploaded
    for (const file of files) {
      // Validate file type (image or PDF)
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!allowedTypes.includes(file.mimetype)) {
        return res.status(400).json({ error: "Only JPEG, PNG, or PDF files are allowed." });
      }

      // Upload to Cloudinary
      try {
        const uploadResult = await cloudinary.uploader.upload(file.path, {
          folder: "owner_verification", // Cloudinary folder name for organization
          resource_type: file.mimetype === "application/pdf" ? "raw" : "image", // Handling image vs PDF files
        });

        // Store the uploaded file's details
        uploadedFiles.push({
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url,
        });

        // Delete the local file after uploading
        fs.unlinkSync(file.path);
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({ error: "Failed to upload file(s)." });
      }
    }

    // Update the listing with the verification documents
    listing.verificationDocuments = uploadedFiles; // Add the uploaded files to the listing
    await listing.save(); // Save the updated listing

    // Respond with the result of the upload
    res.status(200).json({
      success: true,
      message: "File(s) uploaded and associated with the listing successfully.",
      data: uploadedFiles,
    });
  } catch (error) {
    console.error("Error in verifyOwner:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const getVerifyOwner = async (req, res) => {
  try {
    const { listingId } = req.params; // Get the listingId from the URL params

    // Find the listing by its ID
    const listing = await Listing.findById(listingId).select("verificationDocuments status"); // Select only the verificationDocuments and status fields
    if (!listing) {
      return res.status(404).json({ error: "Listing not found." });
    }

    // If the listing has verification documents, return them
    if (listing.verificationDocuments && listing.verificationDocuments.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Verification documents found.",
        data: {
          verificationDocuments: listing.verificationDocuments,
          status: listing.status, // Status of the verification (pending, approved, rejected)
        },
      });
    } else {
      return res.status(404).json({ error: "No verification documents found for this listing." });
    }
  } catch (error) {
    console.error("Error in getVerifyOwner:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const searchFilterListings = async (req, res) => {
  try {
    // Extract query parameters
    const {
      title,
      category,
      minPrice,
      maxPrice,
      condition,
      model,
      year,
      fuel,
      transmission,
      location,
      type,
      status,
      listingType,
    } = req.query;

    // Build the query object
    const query = {};

    // Only show approved listings
    query.status = "approved"; // This ensures only "approved" listings are returned

    // Text-based search (title and description)
    if (title) {
      query.title = { $regex: title, $options: "i" }; // Case-insensitive search
    }

    // Exact match filters
    if (category) query.category = category;
    if (condition) query.condition = condition;
    if (fuel) query.fuel = fuel;
    if (transmission) query.transmission = transmission;
    if (type) query.type = type;
    if (listingType) query.listingType = listingType;

    // Numeric range filters
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (year) query.year = Number(year);

    // Fetch listings based on the query
    const listings = await Listing.find(query);

    // Return the results
    res.status(200).json(listings);
  } catch (error) {
    console.error("Error searching listings:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};



// Get verification documents for a specific listing (Admin only)
// Get verification documents for a specific listing (Admin only)



 