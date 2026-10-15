import mongoose from 'mongoose'
const ref = (m) => ({ type: mongoose.Schema.Types.ObjectId, ref: m })
export default mongoose.model('Comment', new mongoose.Schema({
  user: { ...ref('User'), required: true }, post: { ...ref('Post'), required: true, index: true },
  text: { type: String, required: true, trim: true, maxlength: 500 },
}, { timestamps: { createdAt: true, updatedAt: false } }))
