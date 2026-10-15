import { Plus } from 'lucide-react'
import { stories } from '../data/mockData'

export default function Stories({ user }) {
  return (
    <section aria-label="Stories" className="mb-4 flex gap-4 overflow-x-auto px-1 py-3">
      <button className="flex w-16 shrink-0 flex-col items-center gap-1 text-xs">
        <span className="relative">
          <img src={user.avatar} alt="Your story" className="h-16 w-16 rounded-full border-2 border-white object-cover dark:border-black" />
          <span className="absolute bottom-0 right-0 rounded-full border-2 border-white bg-sky-500 p-0.5 text-white dark:border-black"><Plus size={12} aria-hidden="true" /></span>
        </span>Your story
      </button>
      {stories.map((s) => (
        <button key={s.id} className="group flex w-16 shrink-0 flex-col items-center gap-1 text-xs" aria-label={`View ${s.username}'s story`}>
          <span className={`rounded-full p-[2.5px] transition group-hover:scale-105 ${s.seen ? 'bg-neutral-300 dark:bg-neutral-700' : 'bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600'}`}>
            <img src={s.avatar} alt="" className="h-14 w-14 rounded-full border-2 border-white object-cover dark:border-black" />
          </span>
          <span className="w-full truncate text-center">{s.username}</span>
        </button>
      ))}
    </section>
  )
}
