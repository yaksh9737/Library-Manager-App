// src/components/Header.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaPlus,
  FaBook,
  FaBookReader,
} from "react-icons/fa";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
      {/* Logo */}
      <div>
        <Link to="/" className="text-2xl font-bold">
          E-Book Store
        </Link>
      </div>

      {/* Navigation items */}
      <div className="flex items-center space-x-8 mx-auto">
        {user && (
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/"
                className="flex items-center border border-[#0FF] text-[#0FF] px-3 py-1 rounded hover:bg-[#0FF] hover:text-gray-900 transition-colors"
              >
                <FaBook className="inline mr-1" aria-hidden="true" /> All Books
              </Link>
            </li>
            <li>
              <Link
                to="/add-book"
                className="flex items-center border border-[#0FF] text-[#0FF] px-3 py-1 rounded hover:bg-[#0FF] hover:text-gray-900 transition-colors"
              >
                <FaPlus className="inline mr-1" aria-hidden="true" /> Add E-book
              </Link>
            </li>
            <li>
              <Link
                to="/my-books"
                className="flex items-center border border-[#0FF] text-[#0FF] px-3 py-1 rounded hover:bg-[#0FF] hover:text-gray-900 transition-colors"
              >
                <FaBook className="inline mr-1" aria-hidden="true" /> View My E-books
              </Link>
            </li>
            <li>
              <Link
                to="/my-borrowed-books"
                className="flex items-center border border-[#0FF] text-[#0FF] px-3 py-1 rounded hover:bg-[#0FF] hover:text-gray-900 transition-colors"
              >
                <FaBookReader className="inline mr-1" aria-hidden="true" /> My Borrowed Books
              </Link>
            </li>
          </ul>
        )}
      </div>

      {/* User and Logout */}
      <div className="flex items-center space-x-4">
        {!user ? (
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="flex items-center text-[#39FF14] border border-[#39FF14] px-3 py-1 rounded hover:bg-[#39FF14] hover:text-gray-900 transition-colors"
            >
              <FaSignInAlt className="inline mr-1" aria-hidden="true" /> Login
            </Link>
            <Link
              to="/register"
              className="flex items-center text-[#39FF14] border border-[#39FF14] px-3 py-1 rounded hover:bg-[#39FF14] hover:text-gray-900 transition-colors"
            >
              <FaUserPlus className="inline mr-1" aria-hidden="true" /> Register
            </Link>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <span className="text-[#39FF14]">Hello, {user.username}</span>
            <button
              onClick={logout}
              className="flex items-center text-[#FF073A] border border-[#FF073A] px-3 py-1 rounded hover:bg-[#FF073A] hover:text-gray-900 transition-colors"
            >
              <FaSignOutAlt className="inline mr-1" aria-hidden="true" /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
