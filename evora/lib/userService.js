import API from "./axios";

export const userService = {

  signup: async (data) => {
    const response = await API.post("/auth/register", data);
    return response.data;
  },

  login: async (data) => {
    const response = await API.post("/auth/login", data);
    return response.data;
  },

  getProfile: async () => {
    const response = await API.get("/users/profile");
    return response.data;
  },
};
