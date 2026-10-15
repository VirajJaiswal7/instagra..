import mongoose from 'mongoose'
const ref = (m) => ({ type: mongoose.Schema.Types.ObjectId, ref: m })
export default mongoose.model('Notification', new mongoose.Schema({
  recipient: { ...ref('User'), required: true, index: true }, sender: { ...ref('User'), required: true },
  type: { type: String, enum: ['like', 'comment', 'follow'], required: true }, post: ref('Post'),
  read: { type: Boolean, default: false },
}, { timestamps: { createdAt: true, updatedAt: false } }))
