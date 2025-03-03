import User from "../models/user.js"
import bcryptjs from "bcryptjs"
import { jwtToken } from "../utils/jwtUtils.js"

export const signup = async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  try {
    // Validate required fields
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Validate name (must be at least 3 characters long)
    if (name.length < 3) {
      return res.status(400).json({ success: false, message: "Name must be at least 3 characters long." });
    }

    // Validate email (simple regex check)
    const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Email must be a valid Gmail address." });
    }

    // Validate phone number (check for 09, 07, +2519, +2517)
    const phoneRegex = /^(09\d{8}|07\d{8}|\+2519\d{8}|\+2517\d{8})$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ success: false, message: "Invalid phone number. It should start with 09, 07, +2519, or +2517." });
    }

    // Validate password (must be at least 8 characters long, with uppercase, lowercase, number, and special character)
    const passwordValidator = (password) => {
      const minLength = 8;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      if (password.length < minLength) {
        return 'Password must be at least 8 characters long.';
      }
      if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
        return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
      }
      return null;
    };

    const passwordError = passwordValidator(password);
    if (passwordError) {
      return res.status(400).json({ success: false, message: passwordError });
    }

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exists." });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role: role === "admin" ? "admin" : "customer", 
    });

    // Save new user to the database
    await newUser.save();

    // Generate JWT token
    const token = jwtToken(newUser._id);

    // Set JWT token as a cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    // Respond with success
    res.status(201).json({
      success: true,
      message: "User created successfully.",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role, 
      },
      token,
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    // Validate email format (basic check)
    const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Email must be a valid Gmail address." });
    }

    // Find the user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "No user found with this email." });
    }

    // Check if the password matches the hashed password in the database
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Incorrect password." });
    }

    // Generate a JWT token with the user's role
    const token = jwtToken(user._id, user.role); // Include role in the token payload

    // Set the JWT token as a cookie (with secure and HttpOnly flags)
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true in production (HTTPS only)
      sameSite: "strict",
      maxAge: 3600000, // 1 hour expiry
    });

    // Return a success response with the user details and token
    res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error.message); // Log the error message for better debugging
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const updateProfile = async (req, res) => {
  const { name, phone, password, currentPassword } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Check current password before updating
    if (password && !currentPassword) {
      return res.status(400).json({ success: false, message: "Current password required to change the password." });
    }

    if (currentPassword) {
      const isMatch = await bcryptjs.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Incorrect current password." });
      }
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (password) {
      const hashedPassword = await bcryptjs.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Update Profile Error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
export const getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized." });
    }

    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Get Profile Error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
export const getUsers = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res.status(403).json({ success: false, message: "Access denied." });
    // }

    const users = await User.find(
      {},
      { _id: 1, name: 1, email: 1, role: 1 }
    ).sort({ name: 1 });

    res.status(200).json({ data: users });
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ success: false, message: "Failed to fetch users", details: err.message });
  }
};

// !export const signup = async (req, res) => {
//   const { name, email, phone, password, role } = req.body;

//   try {
//     if (!name || !email || !phone || !password) {
//       return res.status(400).json({ success: false, message: "All fields are required." });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ success: false, message: "Email already exists." });
//     }

//     const hashedPassword = await bcryptjs.hash(password, 10);

    
//     const newUser = new User({
//       name,
//       email,
//       phone,
//       password: hashedPassword,
//       role: role === "admin" ? "admin" : "customer", 
//     });

//     await newUser.save();

//     const token = jwtToken(newUser._id);

//     res.cookie("jwt", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 3600000,
//     });

//     res.status(201).json({
//       success: true,
//       message: "User created successfully.",
//       user: {
//         id: newUser._id,
//         name: newUser.name,
//         email: newUser.email,
//         phone: newUser.phone,
//         role: newUser.role, 
//       },
//       token,
//     });
//   } catch (error) {
//     console.error("Signup Error:", error.message);
//     res.status(500).json({ success: false, message: "Internal server error." });
//   }
// };




// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     if (!email || !password) {
//       return res.status(400).json({ success: false, message: "Email and password are required." });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ success: false, message: "No user found with this email." });
//     }

//     const isPasswordValid = await bcryptjs.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ success: false, message: "Incorrect password." });
//     }

//     // Generate a JWT token with the user's role
//     const token = jwtToken(user._id, user.role); // Include role in the token payload

//     res.cookie("jwt", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production", // Set to true in production (HTTPS only)
//       sameSite: "strict",
//       maxAge: 3600000, // 1 hour expiry
//     });

//     res.status(200).json({
//       success: true,
//       message: "Logged in successfully.",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         role: user.role,
//       },
//       token,
//     });
//   } catch (error) {
//     console.error("Login Error:", error); // Log the full error object for debugging
//     res.status(500).json({ success: false, message: "Internal server error." });
//   }
// };
 
export const logout = (req, res) => {
  try {
    
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error during logout",
    });
  }
};

// export const updateProfile = async (req, res) => {
//   const { name, phone, password } = req.body;
//   const userId = req.user._id;

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found." });
//     }

//     if (name) user.name = name;
//     if (phone) user.phone = phone;
//     if (password) {
//       const hashedPassword = await bcryptjs.hash(password, 10);
//       user.password = hashedPassword;
//     }

//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "Profile updated successfully.",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error("Update Profile Error:", error.message);
//     res.status(500).json({ success: false, message: "Internal server error." });
//   }
// };
// export const getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select("-password");
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found." });
//     }
//     res.status(200).json({ success: true, user });
//   } catch (error) {
//     console.error("Get Profile Error:", error.message);
//     res.status(500).json({ success: false, message: "Internal server error." });
//   }
// };
// export const getUsers = async (req, res) => {
//   try {
//     // Fetch users from the database
//     const users = await User.find(
//       {},
//       { _id: 1, name: 1, email: 1, role: 1 } // Include only necessary fields
//     ).sort({ name: 1 }); // Sort by name (optional)

//     // Return the list of users
//     res.status(200).json({ data: users });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch users", details: err.message });
//   }
// };
  