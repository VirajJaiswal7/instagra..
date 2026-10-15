import Notification from '../models/Notification.js'
import { asyncHandler } from '../middleware/errorHandler.js'
export const list = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ recipient: req.user._id }).sort('-createdAt').limit(50)
    .populate('sender', 'username avatarUrl').populate('post', 'imageUrl')
  res.json({ notifications, unread: notifications.filter((n) => !n.read).length })
})
export const readAll = asyncHandler(async (req, res) => {
  await Notification.updateMany({ recipient: req.user._id, read: false }, { read: true })
  res.json({ message: 'All marked as read' })
})
