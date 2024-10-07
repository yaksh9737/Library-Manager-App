import React from "react";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  // Redirect to book details on click
  const handleClick = () => {
    navigate(`/books/${book._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-gradient-to-b from-gray-500 to-gray-900 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer overflow-hidden"
    >
      {/* Book Image */}
      <img
        src={
          book.imageUrl
            ? `https://swiftrut-task-7.onrender.com${book.imageUrl}`
            : "/no-image.png"
        }
        alt={book.title}
        className="w-full h-96 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
      />

      {/* Book Details */}
      <div className="p-6 text-left text-white">
        <h3 className="text-2xl font-semibold mb-2">{book.title}</h3>
        <p className="text-gray-300 mb-1 font-medium">By: {book.author}</p>
        <p className="text-gray-300 mb-1">Genre: {book.genre}</p>
        <p className="text-gray-300 mb-1">
          Published: {new Date(book.publicationDate).toLocaleDateString()}
        </p>
        <p className="text-gray-300 mb-4">
          Available Copies: {book.availableCopies}
        </p>

        {/* Button */}
        <button className="text-cyan-400 font-medium border border-cyan-400 rounded-full py-2 px-6 transition duration-300 transform hover:bg-cyan-400 hover:text-gray-900 hover:scale-105">
          View Details
        </button>
      </div>
    </div>
  );
};

export default BookCard;
