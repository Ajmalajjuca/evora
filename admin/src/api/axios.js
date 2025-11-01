import axios from "axios";

// ✅ Debug: Check base URL
console.log("====================================");
console.log("VITE_BASE_URL:", import.meta.env.VITE_BASE_URL);
console.log("====================================");

// ✅ Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000, // 10 seconds timeout
});

// ✅ Get token from localStorage
const getToken = () => localStorage.getItem("accessToken");

// ✅ Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["Content-Type"] = "application/json";

    console.log("📤 [Request]", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// ✅ Response Interceptor
api.interceptors.response.use(
  (response) => {
    console.log("📥 [Response]", response.status, response.config.url);
    return response;
  },
  (error) => {
    const { response } = error;

    if (!response) {
      console.error("🌐 Network Error:", error.message);
      return Promise.reject(error);
    }

    const { status } = response;

    // 🚨 If access token expired or invalid — force logout
    if (status === 409) {
      console.warn("🔒 Access token expired or invalid. Redirecting to login...");
      localStorage.removeItem("accessToken");
      window.location.href = "/"; // Adjust to your auth route
      return Promise.reject(error);
    }

    // ⚠️ Handle other status codes
    switch (status) {
      case 400:
        console.error("Bad Request:", response.data);
        break;
      case 403:
        console.error("Forbidden: Access denied");
        break;
      case 404:
        console.error("Not Found:", response.config.url);
        break;
      case 500:
        console.error("Server Error:", response.data);
        break;
      default:
        console.error("Unhandled Error:", response.data);
    }

    return Promise.reject(error);
  }
);

export default api;
