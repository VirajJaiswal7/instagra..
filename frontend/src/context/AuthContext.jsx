import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import api, { refreshSession, setAccessToken, setLogoutHandler } from '../services/api'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)
const shape = (u) => (u ? { ...u, avatar: u.avatarUrl || `https://picsum.photos/seed/${u.username}/150` } : null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLogoutHandler(() => setUser(null))
    refreshSession().then((d) => setUser(shape(d.user))).catch(() => setUser(null)).finally(() => setLoading(false))
  }, [])

  const start = (d) => { setAccessToken(d.accessToken); setUser(shape(d.user)) }
  const login = async (identifier, password) => start((await api.post('/auth/login', { identifier, password })).data)
  const signup = async (form) => start((await api.post('/auth/register', form)).data)
  const logout = useCallback(async () => {
    try { await api.post('/auth/logout') } finally { setAccessToken(null); setUser(null) }
  }, [])

  return <AuthContext.Provider value={{ user, setUser: (u) => setUser(shape(u)), loading, login, signup, logout }}>{children}</AuthContext.Provider>
}
