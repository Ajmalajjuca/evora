import apiClient from '../api/axios'

export const authService = {
  async login(data) {
    const response = await apiClient.post('/auth/login', data)
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
    }
    return response.data
  },

  async register(data) {
    const response = await apiClient.post('/auth/register', data)
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
    }
    return response.data
  },

  logout() {
    localStorage.removeItem('token')
  },

  getToken() {
    return localStorage.getItem('token')
  },
}
