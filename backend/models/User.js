import mongoose from 'mongoose'
const ref = (m) => ({ type: mongoose.Schema.Types.ObjectId, ref: m })
const s = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  username: { type: String, required: true, unique: true, lowercase: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  bio: { type: String, default: '', maxlength: 150 },
  avatarUrl: { type: String, default: '' },
  website: { type: String, default: '' },
  followers: [ref('User')], following: [ref('User')], savedPosts: [ref('Post')],
}, { timestamps: { createdAt: true, updatedAt: false } })
s.set('toJSON', { transform: (_d, r) => { delete r.passwordHash; delete r.__v; return r } })
export default mongoose.model('User', s)
