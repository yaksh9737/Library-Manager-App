const express = require("express");
const {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
  getBooksByCreator, // For books created by the logged-in user
  getBooksByBorrowedUser, // For books borrowed by the logged-in user
} = require("../controllers/bookControllers");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware"); // Middleware for handling file uploads

const router = express.Router();

// Add a new book (Protected)
router.post("/", protect, upload.single("image"), addBook);

// Get all books (Public)
router.get("/", getBooks);

// Get all books created by the logged-in user (Protected)
router.get("/mycreatedbooks", protect, getBooksByCreator);

// Get all books borrowed by the logged-in user (Protected)
router.get("/myborrowedbooks", protect, getBooksByBorrowedUser);

// Get book by ID (Public)
router.get("/:id", getBookById);

// Update a book (Protected, only by creator)
router.put("/:id", protect, upload.single("image"), updateBook);

// Delete a book (Protected, only by creator)
router.delete("/:id", protect, deleteBook);

// Borrow a book (Protected)
router.post("/:id/borrow", protect, borrowBook);

// Return a book (Protected)
router.post("/:id/return", protect, returnBook);

module.exports = router;
