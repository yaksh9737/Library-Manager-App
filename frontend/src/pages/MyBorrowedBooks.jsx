import React, { useEffect, useState, useContext } from "react";
import api from "../api/api"; // Import the API instance
import { AuthContext } from "../context/AuthContext"; // Import AuthContext to get logged-in user context

const MyBorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]); // State to store borrowed books
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { user } = useContext(AuthContext); // Access the logged-in user

  // Fetch borrowed books when component loads
  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const response = await api.get("/books/myborrowedbooks"); // API call to get borrowed books
        setBorrowedBooks(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching borrowed books");
        setLoading(false);
      }
    };

    if (user) {
      fetchBorrowedBooks(); // Only fetch if the user is logged in
    }
  }, [user]);

  // Handle the return of a book
  const handleReturn = async (bookId) => {
    try {
      await api.post(`/books/${bookId}/return`); // Call the return book API
      setBorrowedBooks(borrowedBooks.filter((book) => book._id !== bookId)); // Remove the returned book from the list
    } catch (err) {
      setError("Error returning book");
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200">
        <svg
          className="w-16 h-16 animate-spin text-gray-900/50"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
        >
          <path
            d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-900"
          ></path>
        </svg>
      </div>
    );
  }
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          My Borrowed Books
        </h1>
        {borrowedBooks.length === 0 ? (
          <p className="text-center text-gray-600">
            You haven't borrowed any books yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {borrowedBooks.map((book) => (
              <div
                key={book._id}
                className="bg-gradient-to-b from-gray-500 to-gray-900 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer overflow-hidden"
              >
                <div className="relative">
                  {/* Book Image */}
                  <img
                    src={
                      book.imageUrl
                        ? `https://swiftrut-task-7.onrender.com${book.imageUrl}`
                        : "/no-image.png"
                    }
                    alt={book.title}
                    className="w-full h-96 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  {/* Borrowed Label */}
                  <div className="absolute bottom-0 left-0 bg-yellow-500 px-3 py-1 text-white font-semibold">
                    Borrowed
                  </div>
                </div>
                <div className="p-6 text-white">
                  <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
                  <p className="text-gray-300 text-lg mb-2">By {book.author}</p>
                  <p className="text-gray-400 mb-2">Genre: {book.genre}</p>
                  <p className="text-gray-400 mb-2">
                    Published: {new Date(book.publicationDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-400 mb-4">
                    Available Copies: {book.availableCopies}
                  </p>

                  {/* Return Book Button */}
                  <button
                    onClick={() => handleReturn(book._id)}
                    className="text-red-400 font-medium border border-red-400 rounded-full py-2 px-6 w-full transition duration-300 transform hover:bg-red-400 hover:text-gray-900 hover:scale-105"
                  >
                    Return Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBorrowedBooks;
