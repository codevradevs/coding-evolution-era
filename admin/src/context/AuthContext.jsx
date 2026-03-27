import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { adminApi } from '../lib/api'

const AuthContext = createContext({ admin: null, login: async () => {}, logout: () => {} })
export default AuthContext

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const token = localStorage.getItem('adminToken')
    const user = localStorage.getItem('adminUser')
    return token && user ? JSON.parse(user) : null
  })
  const refreshTimer = useRef(null)

  // Silently refresh the access token using the stored refresh token
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('adminRefreshToken')
    if (!refreshToken) return logout()
    try {
      const { data } = await adminApi.refresh(refreshToken)
      localStorage.setItem('adminToken', data.accessToken)
      scheduleRefresh()
    } catch {
      logout()
    }
  }

  // Schedule refresh 1 min before the 15-min expiry
  const scheduleRefresh = () => {
    if (refreshTimer.current) clearTimeout(refreshTimer.current)
    refreshTimer.current = setTimeout(refreshAccessToken, 14 * 60 * 1000)
  }

  useEffect(() => {
    if (admin) scheduleRefresh()
    return () => { if (refreshTimer.current) clearTimeout(refreshTimer.current) }
  }, [admin])

  const login = async (email, password) => {
    const { data } = await adminApi.login(email, password)
    if (data.user?.role !== 'admin') throw new Error('Not an admin account.')
    localStorage.setItem('adminToken', data.accessToken)
    localStorage.setItem('adminRefreshToken', data.refreshToken)
    localStorage.setItem('adminUser', JSON.stringify(data.user))
    setAdmin(data.user)
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminRefreshToken')
    localStorage.removeItem('adminUser')
    if (refreshTimer.current) clearTimeout(refreshTimer.current)
    setAdmin(null)
  }

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}


