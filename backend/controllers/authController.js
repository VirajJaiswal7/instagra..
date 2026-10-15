import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import User from '../models/User.js'
import RefreshToken from '../models/RefreshToken.js'
import { asyncHandler, httpError } from '../middleware/errorHandler.js'

const DAY = 24 * 3600 * 1000
const cookieOpts = () => ({ httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/api/auth', maxAge: 7 * DAY })
const access = (id) => jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' })
async function issue(res, user) {
  const token = crypto.randomBytes(40).toString('hex')
  await RefreshToken.create({ user: user._id, token, expiresAt: new Date(Date.now() + 7 * DAY) })
  res.cookie('refreshToken', token, cookieOpts())
  return access(user._id)
}

export const register = asyncHandler(async (req, res) => {
  const { name = '', username = '', email = '', password = '' } = req.body
  const e = {}
  if (!name.trim()) e.name = 'Full name is required'
  if (!/^[a-zA-Z0-9._]{3,20}$/.test(username)) e.username = 'Username must be 3–20 letters, numbers, dots or underscores'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email'
  if (password.length < 6) e.password = 'Password must be at least 6 characters'
  if (Object.keys(e).length) throw httpError(400, 'Validation failed', e)
  const dup = await User.findOne({ $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }] })
  if (dup) {
    const d = {}
    if (dup.username === username.toLowerCase()) d.username = 'Username is already taken'
    if (dup.email === email.toLowerCase()) d.email = 'Email is already registered'
    throw httpError(409, 'Account already exists', d)
  }
  const user = await User.create({ name, username, email, passwordHash: await bcrypt.hash(password, 12) })
  res.status(201).json({ user, accessToken: await issue(res, user) })
})

export const login = asyncHandler(async (req, res) => {
  const { identifier = '', password = '' } = req.body
  if (!identifier.trim() || !password) throw httpError(400, 'Username/email and password are required')
  const id = identifier.trim().toLowerCase()
  const user = await User.findOne({ $or: [{ email: id }, { username: id }] })
  if (!user) throw httpError(404, 'User not found')
  if (!(await bcrypt.compare(password, user.passwordHash))) throw httpError(401, 'Incorrect password')
  res.json({ user, accessToken: await issue(res, user) })
})

export const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken
  const stored = token && (await RefreshToken.findOne({ token }))
  if (!stored || stored.revoked || stored.expiresAt < new Date()) throw httpError(401, 'Invalid refresh token')
  stored.revoked = true; await stored.save()           // rotation: old token is single-use
  const user = await User.findById(stored.user)
  if (!user) throw httpError(401, 'User no longer exists')
  res.json({ user, accessToken: await issue(res, user) })
})

export const logout = asyncHandler(async (req, res) => {
  if (req.cookies.refreshToken) await RefreshToken.updateOne({ token: req.cookies.refreshToken }, { revoked: true })
  res.clearCookie('refreshToken', { path: '/api/auth' })
  res.json({ message: 'Logged out' })
})

export const me = (req, res) => res.json({ user: req.user })
