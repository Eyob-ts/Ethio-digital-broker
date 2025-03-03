import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// export  const authenticate = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {
//       // Get token from header
//       token = req.headers.authorization.split(' ')[1];

//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Get user from token
//       req.user = await User.findById(decoded.id).select('-password');

//       next();
//     } catch (error) {
//       console.error(error);
//       res.status(401).json({ message: 'Not authorized' });
//     }
//   }

//   if (!token) {
//     res.status(401).json({ message: 'Not authorized, no token' });
//   }
// };

// // Admin middleware
// export const admin = (req, res, next) => {
//   if (req.user && req.user.isAdmin) {
//     next();
//   } else {
//     res.status(401).json({ message: 'Not authorized as admin' });
//   }
// };
// // Middleware to check if the user is an admin
// export const authorizeAdmin = (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ error: "You are not authorized to access this resource." });
//   }
//   next();
// };

export const authenticate = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token from the header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);  

      console.log("Decoded token payload:", decoded); // Debugging

      // Find the user by ID from the token payload
      req.user = await User.findById(decoded.id).select('-password');

      console.log("Authenticated user:", req.user); // Debugging

      if (!req.user) {
        return res.status(401).json({ message: "User not found." });
      }

      // Ensure the role is set from the token payload
      req.user.role = decoded.role; // Add this line

      next();
    } catch (error) {
      console.error("Token verification error:", error); // Debugging
      res.status(401).json({ message: 'Not authorized' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const authorizeAdmin = (req, res, next) => {
  console.log("User in authorizeAdmin:", req.user); // Debugging

  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "You are not authorized to access this resource." });
  }
  next();
};