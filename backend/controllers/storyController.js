import Story from '../models/Story.js'
import { asyncHandler, httpError } from '../middleware/errorHandler.js'
import { fileUrl } from '../utils/upload.js'

export const create = asyncHandler(async (req, res) => {
  if (!req.file) throw httpError(400, 'An image is required')
  res.status(201).json({ story: await Story.create({ user: req.user._id, imageUrl: fileUrl(req, req.file) }) })
})
export const list = asyncHandler(async (req, res) => {
  const stories = await Story.find({ user: { $in: [...req.user.following, req.user._id] }, expiresAt: { $gt: new Date() } })
    .sort('-createdAt').populate('user', 'username avatarUrl')
  res.json({ stories })
})
export const remove = asyncHandler(async (req, res) => {
  const s = await Story.findById(req.params.id)
  if (!s) throw httpError(404, 'Story not found')
  if (String(s.user) !== String(req.user._id)) throw httpError(403, 'Not your story')
  await s.deleteOne(); res.json({ message: 'Story deleted' })
})
