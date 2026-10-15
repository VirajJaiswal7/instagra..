export const avatar = (seed) => `https://picsum.photos/seed/${seed}/150`
export const photo = (seed) => `https://picsum.photos/seed/${seed}/600/600`

export const users = ['aria.moon', 'jules_k', 'nomad.nia', 'leo.codes', 'sunny.side', 'mika_art', 'tomtravels', 'zara.fit']
  .map((username, i) => ({ id: i + 1, username, avatar: avatar(username) }))

export const stories = users.map((u) => ({ id: u.id, username: u.username, avatar: u.avatar, seen: u.id % 4 === 0 }))

const captions = [
  'Golden hour never misses ✨', 'Coffee first, everything else later ☕', 'Lost in the mountains 🏔️',
  'New project, who dis? 💻', 'Weekend vibes only 🌿', 'Colors of the city 🎨', 'Take me back to this beach 🌊', 'Sunday reset 🧘',
]
const times = ['2 minutes ago', '1 hour ago', '3 hours ago', '5 hours ago', 'Yesterday', '2 days ago', '3 days ago', '1 week ago']

export const comments = [
  { id: 1, username: 'jules_k', text: 'This is stunning! 😍' },
  { id: 2, username: 'leo.codes', text: 'Need to visit ASAP.' },
  { id: 3, username: 'mika_art', text: 'The colors 🔥' },
]

export const posts = users.map((u, i) => ({
  id: i + 1, user: u, image: photo(`vibe-${i + 1}`), caption: captions[i],
  likes: 120 + i * 347, liked: false, saved: false, time: times[i],
  comments: comments.slice(0, (i % 3) + 1),
}))

export const suggestions = users.slice(2, 7).map((u, i) => ({
  ...u, note: ['Followed by aria.moon', 'New to Vibegram', 'Suggested for you', 'Followed by jules_k', 'Popular'][i],
}))
