import User from '../models/User.js'
import Post from '../models/Post.js'
import { asyncHandler, httpError } from '../middleware/errorHandler.js'
import { fileUrl } from '../utils/upload.js'
import { notify } from '../utils/notify.js'

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username.toLowerCase() })
  if (!user) throw httpError(404, 'User not found')
  const posts = await Post.find({ user: user._id }).sort('-createdAt')
  res.json({ user, posts, postsCount: posts.length, followersCount: user.followers.length, followingCount: user.following.length,
    isFollowing: user.followers.some((i) => String(i) === String(req.user._id)) })
})

export const updateMe = asyncHandler(async (req, res) => {
  const { name, username, bio, website } = req.body
  if (name !== undefined) { if (!name.trim()) throw httpError(400, 'Name is required'); req.user.name = name.trim() }
  if (username !== undefined) {
    if (!/^[a-zA-Z0-9._]{3,20}$/.test(username)) throw httpError(400, 'Invalid username', { username: 'Username must be 3–20 letters, numbers, dots or underscores' })
    const taken = await User.findOne({ username: username.toLowerCase(), _id: { $ne: req.user._id } })
    if (taken) throw httpError(409, 'Username is already taken', { username: 'Username is already taken' })
    req.user.username = username
  }
  if (bio !== undefined) req.user.bio = bio.slice(0, 150)
  if (website !== undefined) req.user.website = website
  if (req.file) req.user.avatarUrl = fileUrl(req, req.file)
  await req.user.save()
  res.json({ user: req.user })
})

const setFollow = (follow) => asyncHandler(async (req, res) => {
  const target = await User.findById(req.params.id)
  if (!target) throw httpError(404, 'User not found')
  if (String(target._id) === String(req.user._id)) throw httpError(400, "You can't follow yourself")
  const op = follow ? '$addToSet' : '$pull'
  await User.updateOne({ _id: req.user._id }, { [op]: { following: target._id } })
  await User.updateOne({ _id: target._id }, { [op]: { followers: req.user._id } })
  if (follow) await notify(target._id, req.user._id, 'follow')
  res.json({ following: follow })
})
export const follow = setFollow(true)
export const unfollow = setFollow(false)

export const suggestions = asyncHandler(async (req, res) => {
  const users = await User.find({ _id: { $nin: [...req.user.following, req.user._id] } }).limit(5)
  res.json({ users })
})
