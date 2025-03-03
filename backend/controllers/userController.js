import User from "../models/user.js";
import  exportData  from "../utils/exportData.js";

// Get all users
export const GetUsers = async (req, res) => {
  try {
    const users = await User.find({}, { _id: 1, name: 1, email: 1, role: 1 }).sort({ name: 1 });
    res.status(200).json({ data: users });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users", details: err.message });
  }
};

// Update user role
export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user role.", details: error.message });
  }
};

// Ban or suspend user
export const updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { status }, { new: true }).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user status.", details: error.message });
  }
};

// Export user data
export const exportUserData = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    const csvData = exportData.toCSV(users);

    res.header("Content-Type", "text/csv");
    res.attachment("users.csv");
    res.status(200).send(csvData);
  } catch (error) {
    res.status(500).json({ error: "Failed to export user data.", details: error.message });
  }
};

export const getPhoneNumberById = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the requesting user is an admin or the same user
    if (req.user.role !== "admin" && req.user._id.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Access denied." });
    }

    const user = await User.findById(userId, { phone: 1 });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, phoneNumber: user.phone });
  } catch (err) {
    console.error("Error fetching user's phone number:", err.message);
    res.status(500).json({ success: false, message: "Failed to fetch phone number", details: err.message });
  }
};

// Notify user
export const notifyUser = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    // Implement notification logic (e.g., send email or push notification)
    res.status(200).json({ success: true, message: "Notification sent successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to notify user.", details: error.message });
  }
};