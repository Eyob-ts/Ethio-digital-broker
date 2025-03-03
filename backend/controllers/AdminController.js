import User from "../models/user.js";
import Report from "../models/report.js";

import Listing from "../models/listings.js";
import Activity from "../models/Activity.js";

export const getMetrics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments(); // Total number of users
    const totalListings = await Listing.countDocuments(); // Total number of listings
    const pendingApprovals = await Listing.countDocuments({ status: "Pending" }); // Pending listings

    res.json({
      totalUsers,
      totalListings,
      pendingApprovals,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch metrics" });
  }
};

export const getUserGrowth = async (req, res) => {
  try {
    // Example: Fetch user growth data for the last 6 months
    const userGrowthData = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" }, // Group by month
          users: { $sum: 1 }, // Count users
        },
      },
      {
        $project: {
          name: { $arrayElemAt: ["$monthNames", "$_id"] }, // Map month number to name
          users: 1,
        },
      },
    ]);

    res.json(userGrowthData);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user growth data" });
  }
};

export const getRecentActivities = async (req, res) => {
  try {
    // Fetch the last 10 activities
    const recentActivities = await Activity.find()
      .sort({ date: -1 }) // Sort by most recent
      .limit(10); // Limit to 10 activities

    res.json(recentActivities);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recent activities" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude passwords
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId, { password: 0 }); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user details" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, role }, 
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};



export const getListings = async (req, res) => {
  try {
    const listings = await Listing.find({});
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch listings" });
  }
};


export const getListingById = async (req, res) => {
  try {
    const { listingId } = req.params;
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch listing" });
  }
};

// Delete a listing
export const deleteListing = async (req, res) => {
  try {
    const { listingId } = req.params;
    await Listing.findByIdAndDelete(listingId);
    res.json({ message: "Listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete listing" });
  }
};

//TODO REPORT 
export const getAdminReport = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalListings = await Listing.countDocuments();
    const activeListings = await Listing.countDocuments({ status: "active" });
    const pendingListings = await Listing.countDocuments({ status: "pending" });
    const rejectedListings = await Listing.countDocuments({ status: "rejected" });

    const totalReports = await Report.countDocuments();
    const unresolvedReports = await Report.countDocuments({ status: "pending" });

    res.json({
      success: true,
      data: {
        totalUsers,
        totalListings,
        activeListings,
        pendingListings,
        rejectedListings,
        totalReports,
        unresolvedReports,
      },
    });
  } catch (error) {
    console.error("Admin Report Error:", error); // Log the actual error
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

export const getVerifyOwner = async (req, res) => {
  try {
    const { listingId } = req.params;

    // Find the listing by its ID
    const listing = await Listing.findById(listingId);

    // If the listing doesn't exist, return an error
    if (!listing) {
      return res.status(404).json({ error: "Listing not found." });
    }

    // Check if the user making the request is an admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "You are not authorized to access this resource." });
    }

    // Fetch the verification documents from the listing
    const verificationDocuments = listing.verificationDocuments;

    // If no verification documents are found, return a message
    if (!verificationDocuments || verificationDocuments.length === 0) {
      return res.status(404).json({ message: "No verification documents found for this listing." });
    }

    // Return the verification documents
    res.status(200).json({
      success: true,
      data: verificationDocuments,
    });
  } catch (error) {
    console.error("Error fetching verification documents:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const updateVerificationStatus = async (req, res) => {
  try {
    const { listingId } = req.params;
    const { status } = req.body; // Should be one of 'pending', 'approved', 'rejected'

    // Validate the status
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: "Invalid status value. Must be 'pending', 'approved', or 'rejected'." });
    }

    // Find the listing by ID
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found." });
    }

    // Check if the user making the request is an admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "You are not authorized to access this resource." });
    }

    // Update the verification status
    listing.status = status; // Update the listing's status
    await listing.save(); // Save the changes

    res.status(200).json({
      success: true,
      message: `Verification status updated to ${status}.`,
      data: listing,
    });
  } catch (error) {
    console.error("Error updating verification status:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};


//todo Edit user role
export const editUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    // Validate the role
    if (!["admin", "user", "moderator"].includes(role)) {
      return res.status(400).json({ error: "Invalid role. Must be 'admin', 'user', or 'moderator'." });
    }

    // Find the user by ID and update their role
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role }, // Update the role
      { new: true } // Return the updated document
    );

    // If the user doesn't exist, return an error
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    // Return the updated user
    res.status(200).json({
      success: true,
      message: `User role updated to ${role}.`,
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

//!ban
// Ban or suspend a user
// Ban or unban a user
export const banUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { isBanned } = req.body; // true or false

    // Validate the input
    if (typeof isBanned !== "boolean") {
      return res.status(400).json({ error: "Invalid input. isBanned must be true or false." });
    }

    // Update the user's ban status
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isBanned },
      { new: true } // Return the updated document
    );

    // If the user doesn't exist, return an error
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    // Return the updated user
    res.status(200).json({
      success: true,
      message: isBanned ? "User banned successfully." : "User unbanned successfully.",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error banning/unbanning user:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
