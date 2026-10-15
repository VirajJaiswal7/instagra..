const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export function validateLogin({ id, password }) {
  const e = {}
  if (!id.trim()) e.id = 'Username or email is required.'
  if (!password) e.password = 'Password is required.'
  else if (password.length < 6) e.password = 'Password must be at least 6 characters.'
  return e
}
export function validateSignup(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Full name is required.'
  if (!v.username.trim()) e.username = 'Username is required.'
  else if (!/^[a-zA-Z0-9._]{3,20}$/.test(v.username)) e.username = '3–20 letters, numbers, dots or underscores.'
  if (!v.email.trim()) e.email = 'Email is required.'
  else if (!emailRx.test(v.email)) e.email = 'Enter a valid email address.'
  if (!v.password) e.password = 'Password is required.'
  else if (v.password.length < 6) e.password = 'Password must be at least 6 characters.'
  if (!v.confirm) e.confirm = 'Please confirm your password.'
  else if (v.confirm !== v.password) e.confirm = 'Passwords do not match.'
  return e
}
