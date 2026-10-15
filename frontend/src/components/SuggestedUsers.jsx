import { useState } from 'react'
import { suggestions } from '../data/mockData'
import { fakeRequest } from '../utils/api'

export default function SuggestedUsers({ user }) {
  const [following, setFollowing] = useState({})
  const toggle = async (id) => {
    setFollowing((f) => ({ ...f, [id]: !f[id] }))
    try { await fakeRequest() } catch { setFollowing((f) => ({ ...f, [id]: !f[id] })) }
  }
  return (
    <aside className="sticky top-20 hidden w-80 shrink-0 self-start pl-8 pt-6 lg:block" aria-label="Suggestions">
      <div className="flex items-center gap-3">
        <img src={user.avatar} alt="" className="h-12 w-12 rounded-full object-cover" />
        <div><p className="text-sm font-semibold">{user.username}</p><p className="text-sm text-neutral-500">{user.name}</p></div>
      </div>
      <div className="mb-3 mt-6 flex justify-between text-sm"><span className="font-semibold text-neutral-500">Suggested for you</span><button className="rounded font-semibold hover:opacity-60">See all</button></div>
      <ul className="space-y-3">
        {suggestions.map((u) => (
          <li key={u.id} className="flex items-center gap-3">
            <img src={u.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
            <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{u.username}</p><p className="truncate text-xs text-neutral-500">{u.note}</p></div>
            <button onClick={() => toggle(u.id)} aria-pressed={!!following[u.id]}
              className={`rounded px-1 text-xs font-semibold transition ${following[u.id] ? 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200' : 'text-sky-500 hover:text-sky-700'}`}>
              {following[u.id] ? 'Following' : 'Follow'}
            </button>
          </li>
        ))}
      </ul>
      <ul className="mt-8 flex flex-wrap gap-x-2 gap-y-1 text-xs text-neutral-400">
        {['About', 'Help', 'Privacy', 'Terms', 'Language'].map((l) => <li key={l}><a href="#" onClick={(e) => e.preventDefault()} className="rounded hover:underline">{l}</a></li>)}
      </ul>
      <p className="mt-3 text-xs text-neutral-400">© 2026 VIBEGRAM</p>
    </aside>
  )
}
