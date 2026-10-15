import { Home, Search, PlusSquare, Clapperboard, Moon, Sun } from 'lucide-react'

export default function BottomNav({ user, dark, toggleDark }) {
  const btn = 'flex flex-1 items-center justify-center py-3 transition hover:bg-neutral-100 dark:hover:bg-neutral-900'
  return (
    <nav aria-label="Mobile" className="fixed inset-x-0 bottom-0 z-30 flex border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black md:hidden">
      <button className={btn} aria-label="Home" aria-current="page"><Home size={24} /></button>
      <button className={btn} aria-label="Search"><Search size={24} /></button>
      <button className={btn} aria-label="Create"><PlusSquare size={24} /></button>
      <button className={btn} aria-label="Reels"><Clapperboard size={24} /></button>
      <button className={btn} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} onClick={toggleDark}>{dark ? <Sun size={24} /> : <Moon size={24} />}</button>
      <button className={btn} aria-label="Profile"><img src={user.avatar} alt="" className="h-6 w-6 rounded-full object-cover" /></button>
    </nav>
  )
}
