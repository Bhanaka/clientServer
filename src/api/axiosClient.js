// src/api/axiosClient.js
import axios from 'axios';

// Get base URL from environment variable
const baseUrl = import.meta.env.VITE_BACKEND_API_URL;// Create a reusable axios instance
const axiosClient = axios.create({
    baseURL: baseUrl, // 🔁 your backend base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// ✅ Optional: Handle responses and errors globally
axiosClient.interceptors.response.use(
    (response) => response.data, // Always return only the data
    (error) => {
        console.error('API Error:', error.response || error.message);
        return Promise.reject(error);
    }
);

export default axiosClient;
