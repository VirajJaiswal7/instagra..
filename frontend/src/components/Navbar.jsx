import { Search, PlusSquare, Heart } from 'lucide-react'
import Logo from './Logo'

export default function Navbar({ user, query, setQuery }) {
  const btn = 'rounded-full p-2 transition hover:bg-neutral-100 dark:hover:bg-neutral-800'
  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/90 backdrop-blur dark:border-neutral-800 dark:bg-black/90">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
        <a href="/home" aria-label="Vibegram home" className="rounded"><span className="hidden sm:block"><Logo size="text-2xl" /></span><span className="sm:hidden"><Logo icon /></span></a>
        <div className="relative w-full max-w-xs">
          <label htmlFor="search" className="sr-only">Search posts</label>
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" aria-hidden="true" />
          <input id="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search"
            className="w-full rounded-lg bg-neutral-100 py-2 pl-9 pr-3 text-sm outline-none transition focus:ring-2 focus:ring-sky-400 dark:bg-neutral-900" />
        </div>
        <nav aria-label="Quick actions" className="flex items-center gap-1">
          <button className={btn} aria-label="Create post"><PlusSquare size={22} /></button>
          <button className={btn} aria-label="Notifications"><Heart size={22} /></button>
          <button className="ml-1 rounded-full" aria-label="Your profile"><img src={user.avatar} alt={`${user.username}'s avatar`} className="h-7 w-7 rounded-full object-cover" /></button>
        </nav>
      </div>
    </header>
  )
}
