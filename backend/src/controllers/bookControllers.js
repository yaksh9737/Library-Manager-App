const Book = require("../models/bookModel");
const multer = require("multer");

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

/// Create Book with Image Upload
const addBook = async (req, res) => {
  try {
    const { title, author, genre, publicationDate, availableCopies } = req.body;

    // Get image URL from Multer
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Create the book and assign the logged-in user as the creator
    const book = await Book.create({
      title,
      author,
      genre,
      publicationDate,
      availableCopies,
      imageUrl,
      createdBy: req.user.id, // The logged-in user is the creator of the book
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: "Error creating book", error });
  }
};

// Update Book with Image Upload
const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Ensure that only the user who created the book can update it
    if (book.createdBy.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "User not authorized to update this book" });
    }

    const { title, author, genre, publicationDate, availableCopies } = req.body;

    // Update fields
    book.title = title || book.title;
    book.author = author || book.author;
    book.genre = genre || book.genre;
    book.publicationDate = publicationDate || book.publicationDate;
    book.availableCopies = availableCopies || book.availableCopies;

    // Update image if a new image is uploaded
    if (req.file) {
      book.imageUrl = `/uploads/${req.file.filename}`;
    }

    await book.save();
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
};

// Get all books (Public)
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books", error });
  }
};

// Get book by ID (Public)
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving book", error });
  }
};

// Delete book (Only the creator can delete)
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Ensure only the creator can delete the book
    if (book.createdBy.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "User not authorized to delete this book" });
    }

    await Book.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
};
// Borrow book
const borrowBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.availableCopies <= 0) {
      return res.status(400).json({ message: "No available copies to borrow" });
    }

    // Add the logged-in user to borrowedBy array and decrease available copies
    book.borrowedBy.push(req.user.id);
    book.availableCopies -= 1;

    await book.save();

    res.status(200).json({ message: "Book borrowed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error borrowing book", error });
  }
};

// Return book
const returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Ensure the book was borrowed by the user
    const index = book.borrowedBy.indexOf(req.user.id);
    if (index === -1) {
      return res
        .status(400)
        .json({ message: "Book not borrowed by this user" });
    }

    // Remove user from the borrowedBy array and increase available copies
    book.borrowedBy.splice(index, 1);
    book.availableCopies += 1;

    await book.save();

    res.status(200).json({ message: "Book returned successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error returning book", error });
  }
};

// Get all books added by the logged-in user
// Get all books added by the logged-in user
const getBooksByCreator = async (req, res) => {
  try {
    const books = await Book.find({ createdBy: req.user.id })
      .populate("createdBy", "name email") // Populate creator details
      .populate("borrowedBy", "name email"); // Populate borrower details

    res.status(200).json(books);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving books by creator", error });
  }
};

// Get all books borrowed by the logged-in user
const getBooksByBorrowedUser = async (req, res) => {
  try {
    const books = await Book.find({ borrowedBy: req.user.id });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving borrowed books", error });
  }
};

module.exports = {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
  getBooksByCreator,
  getBooksByBorrowedUser,
};
