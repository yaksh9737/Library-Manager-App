import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { AuthProvider } from "./context/AuthContext";
import AddBook from "./pages/AddBook";
import MyBooks from "./pages/MyBooks";
import MyBorrowedBooks from "./pages/MyBorrowedBooks";
import EditBook from "./pages/EditBook";
import BookDetails from "./pages/BookDetails"; // Import the BookDetails component

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className="">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/books/:id" element={<BookDetails />} />{" "}
            {/* Book details route */}
            {/* Public routes for Login and Register */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            {/* Protected routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/add-book" element={<AddBook />} />
              <Route path="/my-books" element={<MyBooks />} />
              <Route path="/my-borrowed-books" element={<MyBorrowedBooks />} />
              <Route path="/edit-book/:id" element={<EditBook />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
