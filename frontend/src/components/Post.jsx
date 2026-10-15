import { useState } from 'react'
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react'
import { fakeRequest } from '../utils/api'

export default function Post({ post, me }) {
  const [s, setS] = useState({ liked: post.liked, saved: post.saved, likes: post.likes })
  const [comments, setComments] = useState(post.comments)
  const [showAll, setShowAll] = useState(false)
  const [text, setText] = useState('')

  // Optimistic update: flip immediately, roll back if the (fake) request fails.
  const toggle = async (key) => {
    const prev = s
    setS(key === 'liked' ? { ...s, liked: !s.liked, likes: s.likes + (s.liked ? -1 : 1) } : { ...s, saved: !s.saved })
    try { await fakeRequest() } catch { setS(prev) }
  }
  const addComment = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    setComments([...comments, { id: Date.now(), username: me.username, text: text.trim() }])
    setText(''); setShowAll(true)
  }
  const icon = 'rounded p-1 transition hover:opacity-60 active:scale-90'
  const visible = showAll ? comments : comments.slice(-1)

  return (
    <article className="border-b border-neutral-200 pb-4 dark:border-neutral-800">
      <header className="flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 p-[2px]"><img src={post.user.avatar} alt="" className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-black" /></span>
          <span className="text-sm font-semibold">{post.user.username}</span>
          <span className="text-xs text-neutral-500">• {post.time}</span>
        </div>
        <button className={icon} aria-label="Post options"><MoreHorizontal size={20} /></button>
      </header>
      <img src={post.image} alt={`Photo by ${post.user.username}: ${post.caption}`} loading="lazy" onDoubleClick={() => !s.liked && toggle('liked')}
        className="aspect-square w-full rounded-md bg-neutral-200 object-cover dark:bg-neutral-800" />
      <div className="flex items-center justify-between pt-3">
        <div className="flex gap-3">
          <button className={icon} onClick={() => toggle('liked')} aria-pressed={s.liked} aria-label={s.liked ? 'Unlike' : 'Like'}>
            <Heart size={24} className={s.liked ? 'fill-red-500 text-red-500' : ''} />
          </button>
          <button className={icon} aria-label="Comment" onClick={() => document.getElementById(`c-${post.id}`)?.focus()}><MessageCircle size={24} /></button>
          <button className={icon} aria-label="Share"><Send size={24} /></button>
        </div>
        <button className={icon} onClick={() => toggle('saved')} aria-pressed={s.saved} aria-label={s.saved ? 'Remove bookmark' : 'Save'}>
          <Bookmark size={24} className={s.saved ? 'fill-current' : ''} />
        </button>
      </div>
      <p className="mt-2 text-sm font-semibold">{s.likes.toLocaleString()} likes</p>
      <p className="mt-1 text-sm"><span className="font-semibold">{post.user.username}</span> {post.caption}</p>
      {comments.length > 1 && !showAll && (
        <button onClick={() => setShowAll(true)} className="mt-1 rounded text-sm text-neutral-500 hover:underline">View all {comments.length} comments</button>
      )}
      {visible.map((c) => <p key={c.id} className="mt-1 text-sm"><span className="font-semibold">{c.username}</span> {c.text}</p>)}
      <form onSubmit={addComment} className="mt-2 flex items-center gap-2">
        <label htmlFor={`c-${post.id}`} className="sr-only">Add a comment</label>
        <input id={`c-${post.id}`} value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a comment…" className="flex-1 bg-transparent py-1 text-sm outline-none placeholder:text-neutral-500" />
        <button type="submit" disabled={!text.trim()} className="rounded text-sm font-semibold text-sky-500 transition hover:text-sky-700 disabled:opacity-40">Post</button>
      </form>
    </article>
  )
}
