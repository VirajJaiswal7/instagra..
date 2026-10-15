import { useState } from 'react'
import { Home, Search, Compass, Clapperboard, MessageCircle, Heart, PlusSquare, User, Menu, Moon, Sun, LogOut } from 'lucide-react'

const items = [[Home, 'Home'], [Search, 'Search'], [Compass, 'Explore'], [Clapperboard, 'Reels'], [MessageCircle, 'Messages'], [Heart, 'Notifications'], [PlusSquare, 'Create'], [User, 'Profile']]

export default function Sidebar({ user, dark, toggleDark, logout }) {
  const [open, setOpen] = useState(false)
  const row = 'flex w-full items-center gap-4 rounded-lg p-3 text-left transition hover:bg-neutral-100 dark:hover:bg-neutral-900'
  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-20 shrink-0 flex-col justify-between border-r border-neutral-200 px-3 py-4 dark:border-neutral-800 md:flex xl:w-64">
      <nav aria-label="Main">
        <ul className="space-y-1">
          {items.map(([Icon, label], i) => (
            <li key={label}>
              <button className={`${row} ${i === 0 ? 'font-bold' : ''}`} aria-current={i === 0 ? 'page' : undefined}>
                <Icon size={24} aria-hidden="true" /><span className="hidden xl:inline">{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="relative">
        {open && (
          <div role="menu" className="absolute bottom-14 left-0 w-60 rounded-xl border border-neutral-200 bg-white p-2 shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
            <button role="menuitem" onClick={toggleDark} className={row}>{dark ? <Sun size={20} /> : <Moon size={20} />}{dark ? 'Light mode' : 'Dark mode'}</button>
            <button role="menuitem" onClick={logout} className={row}><LogOut size={20} />Log out ({user.username})</button>
          </div>
        )}
        <button className={row} onClick={() => setOpen(!open)} aria-expanded={open} aria-haspopup="menu"><Menu size={24} aria-hidden="true" /><span className="hidden xl:inline">More</span></button>
      </div>
    </aside>
  )
}
