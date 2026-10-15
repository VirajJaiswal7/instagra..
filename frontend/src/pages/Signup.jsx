import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import Field from '../components/Field'
import { useAuth } from '../context/AuthContext'
import { validateSignup } from '../utils/validate'

const fields = [
  ['name', 'Full name', 'text', 'name'], ['username', 'Username', 'text', 'username'], ['email', 'Email', 'email', 'email'],
  ['password', 'Password', 'password', 'new-password'], ['confirm', 'Confirm password', 'password', 'new-password'],
]

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    const errs = validateSignup(form)
    setErrors(errs)
    if (Object.keys(errs).length) return
    setLoading(true)
    try { await signup(form); navigate('/home') }
    catch (err) { setErrors(err.response?.data?.errors || { confirm: err.response?.data?.message || 'Cannot reach server' }); setLoading(false) }
  }

  return (
    <AuthLayout below={<>Have an account? <Link to="/" className="font-semibold text-sky-500 hover:underline">Log in</Link></>}>
      <p className="mb-4 text-center font-semibold text-neutral-500">Sign up to see photos and videos from your friends.</p>
      <form onSubmit={submit} noValidate className="space-y-2">
        {fields.map(([k, label, type, ac]) => (
          <Field key={k} id={k} type={type} label={label} autoComplete={ac} value={form[k]} error={errors[k]}
            onChange={(e) => { setForm({ ...form, [k]: e.target.value }); setErrors({ ...errors, [k]: undefined }) }} />
        ))}
        <button type="submit" disabled={loading}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-sky-500 py-2 text-sm font-semibold text-white transition hover:bg-sky-600 disabled:opacity-50">
          {loading && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}{loading ? 'Creating account…' : 'Sign up'}
        </button>
      </form>
    </AuthLayout>
  )
}
