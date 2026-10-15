import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import Field from '../components/Field'
import { useAuth } from '../context/AuthContext'
import { validateLogin } from '../utils/validate'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ id: '', password: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)
  const set = (k) => (e) => { setForm({ ...form, [k]: e.target.value }); setErrors({ ...errors, [k]: undefined }) }

  const submit = async (e, creds = form) => {
    e?.preventDefault()
    const errs = validateLogin(creds)
    setErrors(errs); setServerError('')
    if (Object.keys(errs).length) return
    setLoading(true)
    try { await login(creds.id.trim(), creds.password); navigate('/home') }
    catch (err) { setServerError(err.response?.data?.message || 'Cannot reach server'); setLoading(false) }
  }

  return (
    <AuthLayout below={<>Don't have an account? <Link to="/signup" className="font-semibold text-sky-500 hover:underline">Sign up</Link></>}>
      <form onSubmit={submit} noValidate className="space-y-2">
        <Field id="id" label="Username or email" value={form.id} onChange={set('id')} error={errors.id} autoComplete="username" />
        <Field id="password" type="password" label="Password" value={form.password} onChange={set('password')} error={errors.password} autoComplete="current-password" />
        <button type="submit" disabled={!form.id || !form.password || loading}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-sky-500 py-2 text-sm font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50">
          {loading && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}{loading ? 'Logging in…' : 'Log in'}
        </button>
        {serverError && <p role="alert" className="pt-1 text-center text-sm text-red-600">{serverError}</p>}
      </form>
      <div className="my-4 flex items-center gap-4" role="separator"><div className="h-px flex-1 bg-neutral-300" /><span className="text-xs font-semibold text-neutral-500">OR</span><div className="h-px flex-1 bg-neutral-300" /></div>
      <button type="button" onClick={() => submit(null, { id: 'demo@vibegram.com', password: 'password123' })}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-300 py-2 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-50">
        <span className="font-bold text-blue-600" aria-hidden="true">G</span> Continue with Google
      </button>
      <p className="mt-4 text-center"><a href="#" onClick={(e) => e.preventDefault()} className="rounded text-xs text-sky-900 hover:underline">Forgot password?</a></p>
      {/* <p className="mt-4 text-center text-xs text-neutral-400">Demo: demo@vibegram.com / password123</p> */}
    </AuthLayout>
  )
}
