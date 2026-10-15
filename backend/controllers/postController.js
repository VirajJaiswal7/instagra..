import Post from '../models/Post.js'
import Comment from '../models/Comment.js'
import User from '../models/User.js'
import { asyncHandler, httpError } from '../middleware/errorHandler.js'
import { fileUrl } from '../utils/upload.js'
import { notify } from '../utils/notify.js'

const populate = (q) => q.populate('user', 'username name avatarUrl')
const has = (arr, id) => arr.some((i) => String(i) === String(id))
const shape = (p, me) => ({ ...p.toJSON(), likesCount: p.likes.length, commentsCount: p.comments.length, liked: has(p.likes, me._id), saved: has(me.savedPosts, p._id) })

export const feed = asyncHandler(async (req, res) => {
  const posts = await populate(Post.find({ user: { $in: [...req.user.following, req.user._id] } }).sort('-createdAt').limit(50))
  res.json({ posts: posts.map((p) => shape(p, req.user)) })
})
export const explore = asyncHandler(async (req, res) => {
  const posts = await populate(Post.find({ user: { $ne: req.user._id } }).sort('-createdAt').limit(60))
  res.json({ posts: posts.map((p) => shape(p, req.user)) })
})
export const create = asyncHandler(async (req, res) => {
  if (!req.file) throw httpError(400, 'An image is required')
  const post = await Post.create({ user: req.user._id, imageUrl: fileUrl(req, req.file), caption: req.body.caption || '', location: req.body.location || '' })
  res.status(201).json({ post: shape(await populate(Post.findById(post._id)), req.user) })
})
export const getOne = asyncHandler(async (req, res) => {
  const post = await populate(Post.findById(req.params.id))
  if (!post) throw httpError(404, 'Post not found')
  res.json({ post: shape(post, req.user) })
})
export const remove = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (!post) throw httpError(404, 'Post not found')
  if (String(post.user) !== String(req.user._id)) throw httpError(403, 'You can only delete your own posts')
  await Comment.deleteMany({ post: post._id }); await post.deleteOne()
  res.json({ message: 'Post deleted' })
})
const setLike = (like) => asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, { [like ? '$addToSet' : '$pull']: { likes: req.user._id } }, { new: true })
  if (!post) throw httpError(404, 'Post not found')
  if (like) await notify(post.user, req.user._id, 'like', post._id)
  res.json({ liked: like, likesCount: post.likes.length })
})
export const like = setLike(true)
export const unlike = setLike(false)
const setSave = (save) => asyncHandler(async (req, res) => {
  if (!(await Post.exists({ _id: req.params.id }))) throw httpError(404, 'Post not found')
  await User.updateOne({ _id: req.user._id }, { [save ? '$addToSet' : '$pull']: { savedPosts: req.params.id } })
  res.json({ saved: save })
})
export const save = setSave(true)
export const unsave = setSave(false)
