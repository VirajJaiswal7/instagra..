import mongoose from 'mongoose'
export default mongoose.model('Story', new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imageUrl: { type: String, required: true },
  expiresAt: { type: Date, default: () => new Date(Date.now() + 24 * 3600 * 1000), index: true },
}, { timestamps: { createdAt: true, updatedAt: false } }))
