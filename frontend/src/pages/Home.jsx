import React, { useEffect, useState } from "react";
import api from "../api/api"; // Ensure API instance is imported
import BookCard from "../components/BookCard"; // Import BookCard component

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for filters
  const [filterGenre, setFilterGenre] = useState("");
  const [filterAuthor, setFilterAuthor] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // Fetch all books from backend API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get("/books");
        setBooks(response.data); // Store fetched books in state
        setLoading(false);
      } catch (err) {
        setError("Error fetching books");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Filter books based on genre, author, and publication date
  const filteredBooks = books.filter((book) => {
    const matchGenre = filterGenre
      ? book.genre.toLowerCase().includes(filterGenre.toLowerCase())
      : true;
    const matchAuthor = filterAuthor
      ? book.author.toLowerCase().includes(filterAuthor.toLowerCase())
      : true;
    const matchDate = filterDate
      ? new Date(book.publicationDate).getFullYear() === parseInt(filterDate)
      : true;

    return matchGenre && matchAuthor && matchDate;
  });

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100/70">
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
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className=" bg-gray-200 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-gray-800 text-center mb-12">
        Dive Into Our Curated Book Collection
        </h2>

        {/* Dark Filter Section */}
        <div className="bg-gradient-to-b from-gray-900 to-gray-500 rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-3xl font-semibold text-white mb-6 text-center">
            Filter Books
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Filter by Genre */}
            <div className="bg-gray-900 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <label className="block mb-2 text-gray-300 flex items-center">
                <span className="mr-2">🎭</span> {/* Genre icon */}
                Filter by Genre
              </label>
              <input
                type="text"
                value={filterGenre}
                onChange={(e) => setFilterGenre(e.target.value)}
                placeholder="Enter genre"
                className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded focus:ring-2 focus:ring-cyan-500 focus:outline-none hover:bg-gray-700 transition duration-200"
              />
            </div>

            {/* Filter by Author */}
            <div className="bg-gray-900 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <label className="block mb-2 text-gray-300 flex items-center">
                <span className="mr-2">✍️</span> {/* Author icon */}
                Filter by Author
              </label>
              <input
                type="text"
                value={filterAuthor}
                onChange={(e) => setFilterAuthor(e.target.value)}
                placeholder="Enter author"
                className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded focus:ring-2 focus:ring-cyan-500 focus:outline-none hover:bg-gray-700 transition duration-200"
              />
            </div>

            {/* Filter by Publication Date */}
            <div className="bg-gray-900 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <label className="block mb-2 text-gray-300 flex items-center">
                <span className="mr-2">📅</span> {/* Publication Date icon */}
                Filter by Year of Publication
              </label>
              <input
                type="number"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                placeholder="Enter year"
                className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded focus:ring-2 focus:ring-cyan-500 focus:outline-none hover:bg-gray-700 transition duration-200"
              />
            </div>
          </div>
        </div>


        {/* Books Listing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
          {filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>

        {/* No books found */}
        {filteredBooks.length === 0 && (
          <div className="text-center text-gray-500">No books found</div>
        )}
      </div>
    </div>
  );
};

export default Home;
