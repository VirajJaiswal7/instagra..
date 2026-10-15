import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import User from './models/User.js'
import Post from './models/Post.js'
import Comment from './models/Comment.js'
import Story from './models/Story.js'
import Notification from './models/Notification.js'
import RefreshToken from './models/RefreshToken.js'

await mongoose.connect(process.env.MONGO_URI)
await Promise.all([User, Post, Comment, Story, Notification, RefreshToken].map((m) => m.deleteMany({})))
const hash = await bcrypt.hash('password123', 12)
const names = ['aria', 'jules', 'nia', 'leo', 'sunny', 'mika']
const users = await User.insertMany(names.map((n) => ({
  name: n[0].toUpperCase() + n.slice(1) + ' Vibe', username: n, email: `${n}@vibegram.com`, passwordHash: hash,
  bio: `Hi, I'm ${n} ✨`, avatarUrl: `https://picsum.photos/seed/${n}/150`,
})))
for (const u of users) { // everyone follows everyone
  u.following = users.filter((o) => o._id !== u._id).map((o) => o._id)
  u.followers = u.following; await u.save()
}
const captions = ['Golden hour ✨', 'Coffee first ☕', 'Lost in the mountains 🏔️', 'New project 💻', 'Weekend vibes 🌿', 'City colors 🎨']
const posts = await Post.insertMany(Array.from({ length: 12 }, (_, i) => ({
  user: users[i % 6]._id, imageUrl: `https://picsum.photos/seed/vibe${i}/600/600`, caption: captions[i % 6],
  location: ['Paris', 'Tokyo', 'Lagos', 'Lisbon'][i % 4], createdAt: new Date(Date.now() - i * 3600 * 1000 * 5),
})))
for (const p of posts.slice(0, 6)) {
  const c = await Comment.create({ user: users[(users.findIndex((u) => u._id.equals(p.user)) + 1) % 6]._id, post: p._id, text: 'Love this! 😍' })
  p.comments.push(c._id); await p.save()
}
await Story.insertMany(users.map((u, i) => ({ user: u._id, imageUrl: `https://picsum.photos/seed/story${i}/400/700` })))
console.log('Seeded. Login: aria@vibegram.com / password123'); process.exit(0)
