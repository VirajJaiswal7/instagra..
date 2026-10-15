import Comment from '../models/Comment.js'
import Post from '../models/Post.js'
import { asyncHandler, httpError } from '../middleware/errorHandler.js'
import { notify } from '../utils/notify.js'

export const add = asyncHandler(async (req, res) => {
  const text = (req.body.text || '').trim()
  if (!text) throw httpError(400, 'Comment text is required')
  const post = await Post.findById(req.params.id)
  if (!post) throw httpError(404, 'Post not found')
  const c = await Comment.create({ user: req.user._id, post: post._id, text })
  post.comments.push(c._id); await post.save()
  await notify(post.user, req.user._id, 'comment', post._id)
  res.status(201).json({ comment: await c.populate('user', 'username avatarUrl') })
})
export const list = asyncHandler(async (req, res) => {
  res.json({ comments: await Comment.find({ post: req.params.id }).sort('createdAt').populate('user', 'username avatarUrl') })
})
export const remove = asyncHandler(async (req, res) => {
  const c = await Comment.findById(req.params.id)
  if (!c) throw httpError(404, 'Comment not found')
  const post = await Post.findById(c.post)
  const allowed = String(c.user) === String(req.user._id) || (post && String(post.user) === String(req.user._id))
  if (!allowed) throw httpError(403, 'Not allowed to delete this comment')
  if (post) { post.comments.pull(c._id); await post.save() }
  await c.deleteOne()
  res.json({ message: 'Comment deleted' })
})
