import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = axios.create({
  baseURL: "https://evora-r13i.onrender.com/api", // ⚠️ replace with your backend IP
  timeout: 10000,
});

API.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("❌ API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default API;
