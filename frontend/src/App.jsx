import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'

const Splash = () => <div className="grid min-h-screen place-items-center text-neutral-500" role="status">Loading…</div>
const Protected = ({ children }) => { const { user, loading } = useAuth(); return loading ? <Splash /> : user ? children : <Navigate to="/" replace /> }
const Public = ({ children }) => { const { user, loading } = useAuth(); return loading ? <Splash /> : user ? <Navigate to="/home" replace /> : children }

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Public><Login /></Public>} />
      <Route path="/signup" element={<Public><Signup /></Public>} />
      <Route path="/home" element={<Protected><Home /></Protected>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
