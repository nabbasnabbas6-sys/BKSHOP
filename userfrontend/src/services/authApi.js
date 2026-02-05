const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const authApi = {
  signup: async (email, password, displayName) => {
    const response = await fetch(`${API_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, displayName }),
    })
    return response.json()
  },

  login: async (email) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    return response.json()
  },

  googleAuth: async (idToken) => {
    const response = await fetch(`${API_URL}/api/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    })
    return response.json()
  },

  getUser: async (uid) => {
    const response = await fetch(`${API_URL}/api/auth/user/${uid}`)
    return response.json()
  },
}

export default authApi
