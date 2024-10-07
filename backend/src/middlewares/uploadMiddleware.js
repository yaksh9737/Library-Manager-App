const multer = require("multer");
const path = require("path");

// Set up storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/")); // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename for each upload
  },
});

// File filter for accepting all file types (no restriction)
const fileFilter = (req, file, cb) => {
  // No restriction on file types, so just accept all files
  cb(null, true);
};

// Initialize Multer with storage only (no file size limit or type restrictions)
const upload = multer({
  storage, // Use the storage config
  fileFilter, // Allow all files
});

module.exports = upload;
