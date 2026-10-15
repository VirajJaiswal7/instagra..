import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', withCredentials: true })
let accessToken = null
export const setAccessToken = (t) => { accessToken = t }
let onLogout = () => {}
export const setLogoutHandler = (fn) => { onLogout = fn }

api.interceptors.request.use((cfg) => {
  if (accessToken) cfg.headers.Authorization = `Bearer ${accessToken}`
  return cfg
})

let refreshing = null // single-flight so parallel 401s share one refresh
export const refreshSession = () => {
  refreshing ||= axios.post(`${api.defaults.baseURL}/auth/refresh`, {}, { withCredentials: true })
    .then((r) => { setAccessToken(r.data.accessToken); return r.data })
    .finally(() => { refreshing = null })
  return refreshing
}

api.interceptors.response.use((r) => r, async (err) => {
  const cfg = err.config
  const isAuthRoute = cfg?.url?.startsWith('/auth/')
  if (err.response?.status === 401 && !cfg._retry && !isAuthRoute) {
    cfg._retry = true
    try { await refreshSession(); return api(cfg) }
    catch { setAccessToken(null); onLogout() }
  }
  return Promise.reject(err)
})
export default api
