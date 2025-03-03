import Listing from "../models/listings.js";

// Get listings for a specific customer
export const getCustomerListings = async (req, res) => {
  try {
    const customerId = req.user.ownerId; // Extract from authenticated user
    console.log("Customer ID:", req.user.id);

    const listings = await Listing.find({ owner: customerId });

    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching listings", error });
  }
};


