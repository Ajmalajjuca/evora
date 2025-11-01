// src/services/userService.js
import api from "../api/axios";

/**
 * 🧠 User Service — handles all user-related API requests
 */

// ✅ Get all users (with optional query params)
export const getAllUsers = async (params = {}) => {
  try {
    const res = await api.get("/users", { params });
    return res.data;
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    throw error;
  }
};

// ✅ Get single user by ID
export const getUserById = async (id) => {
  try {
    const res = await api.get(`/users/${id}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error fetching user with id ${id}:`, error);
    throw error;
  }
};

// ✅ Create new user
export const createUser = async (userData) => {
  try {
    const res = await api.post("/users", userData);
    return res.data;
  } catch (error) {
    console.error("❌ Error creating user:", error);
    throw error;
  }
};

// ✅ Update user by ID
export const updateUser = async (id, updateData) => {
  try {
    const res = await api.put(`/users/${id}`, updateData);
    return res.data;
  } catch (error) {
    console.error(`❌ Error updating user ${id}:`, error);
    throw error;
  }
};

// ✅ Delete user
export const deleteUser = async (id) => {
  try {
    const res = await api.delete(`/users/${id}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error deleting user ${id}:`, error);
    throw error;
  }
};

// ✅ Search users (by name, email, etc.)
export const searchUsers = async (query) => {
  try {
    const res = await api.get(`/users/search`, { params: { q: query } });
    return res.data;
  } catch (error) {
    console.error("❌ Error searching users:", error);
    throw error;
  }
};

// ✅ Filter users (by role, status, etc.)
export const filterUsers = async (filters) => {
  try {
    const res = await api.get(`/users/filter`, { params: filters });
    return res.data;
  } catch (error) {
    console.error("❌ Error filtering users:", error);
    throw error;
  }
};

// ✅ Get user analytics (for admin dashboard)
export const getUserAnalytics = async () => {
  try {
    const res = await api.get("/users/analytics");
    return res.data;
  } catch (error) {
    console.error("❌ Error fetching user analytics:", error);
    throw error;
  }
};


