import mongoose from 'mongoose'
const ref = (m) => ({ type: mongoose.Schema.Types.ObjectId, ref: m })
export default mongoose.model('Post', new mongoose.Schema({
  user: { ...ref('User'), required: true, index: true }, imageUrl: { type: String, required: true },
  caption: { type: String, default: '', maxlength: 2200 }, location: { type: String, default: '' },
  likes: [ref('User')], comments: [ref('Comment')],
}, { timestamps: { createdAt: true, updatedAt: false } }))
