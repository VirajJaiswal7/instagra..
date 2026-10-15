import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { asyncHandler, httpError } from './errorHandler.js'
export const protect = asyncHandler(async (req, _res, next) => {
  const token = req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.slice(7) : null
  if (!token) throw httpError(401, 'Not authenticated')
  let payload
  try { payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET) } catch { throw httpError(401, 'Token expired or invalid') }
  req.user = await User.findById(payload.id)
  if (!req.user) throw httpError(401, 'User no longer exists')
  next()
})
