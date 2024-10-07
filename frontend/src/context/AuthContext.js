// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import api from "../api/api"; // API instance for handling requests
import { jwtDecode } from "jwt-decode"; // Importing jwtDecode for decoding tokens

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from local storage if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode the token to get user details
        setUser(decoded); // Set the user details from the token
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token"); // Remove invalid token
      }
    }
    setLoading(false); // Set loading to false once user is loaded or not
  }, []);

  // Login user
  const login = async (email, password) => {
    try {
      const response = await api.post("/users/login", { email, password });
      const { token } = response.data;
      localStorage.setItem("token", token); // Store token in localStorage
      const decoded = jwtDecode(token); // Decode the token to get user details
      setUser(decoded); // Set the user details
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  // Register user
  const register = async (username, email, password) => {
    try {
      const response = await api.post("/users/register", {
        username,
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token); // Store token in localStorage
      const decoded = jwtDecode(token); // Decode the token to get user details
      setUser(decoded); // Set the user details
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setUser(null); // Clear user state
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children} {/* Render children once loading is complete */}
    </AuthContext.Provider>
  );
};
