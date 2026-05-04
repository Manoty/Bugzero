import { createContext, useContext, useState, useEffect } from 'react'
import { adminLogin } from '../api/services'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) setAdmin({ token })
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    const { data } = await adminLogin({ username, password })
    localStorage.setItem('access_token', data.access)
    localStorage.setItem('refresh_token', data.refresh)
    setAdmin({ token: data.access })
    return data
  }

  const logout = () => {
    localStorage.clear()
    setAdmin(null)
  }

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)