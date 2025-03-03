import multer from "multer";
import path from "path";

// Configure multer with diskStorage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder for temporary file storage
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname); // Extract file extension
    cb(null, `${uniqueSuffix}${ext}`); // Unique filename
  },
});

// Multer instance
const upload = multer({ storage });

// Middleware to handle multiple file types
export const uploadFiles = upload.fields([
  { name: "images", maxCount: 10 }, // For listing images (max 10 files)
  { name: "verificationFiles", maxCount: 5 }, // For verification documents (max 5 files)
]);