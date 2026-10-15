export const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)
export const httpError = (status, message, errors) => Object.assign(new Error(message), { status, errors })
export const notFound = (req, res) => res.status(404).json({ message: 'Route not found' })
export function errorHandler(err, req, res, _next) {
  if (err.code === 11000) return res.status(409).json({ message: 'Already exists', errors: Object.fromEntries(Object.keys(err.keyPattern).map((k) => [k, `${k} is already taken`])) })
  if (err.name === 'CastError') return res.status(400).json({ message: 'Invalid id' })
  const status = err.status || 500
  if (status === 500) console.error(err)
  res.status(status).json({ message: status === 500 ? 'Server error' : err.message, errors: err.errors })
}
