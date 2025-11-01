import api from "../api/axios";

export const login = async (email, password) => {
    try {
     const res = await api.post("/auth/admin/login", { email, password });
     return res.data;
    } catch (error) {
      console.error("❌ Error logging in:", error);
      throw error;
    }
  };
