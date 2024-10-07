import axios from "axios";

// Create an Axios instance with the base URL for your API
const api = axios.create({
  baseURL: "https://swiftrut-task-7.onrender.com/api", // Update with your actual backend URL
});

// Export baseURL for potential use in other components

// Request Interceptor: Include token in the request headers if it exists
api.interceptors.request.use( 
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle any errors
  }
);

// Response Interceptor: Optionally handle global response cases (e.g., 401 Unauthorized)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Automatically handle token expiration or unauthorized access
      localStorage.removeItem("token"); // Remove token if unauthorized
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error); // Handle other errors
  }
);

export default api; // Export the Axios instance
