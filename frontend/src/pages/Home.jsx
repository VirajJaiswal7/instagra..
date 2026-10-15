import { useMemo, useState } from 'react'
import { SearchX } from 'lucide-react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Stories from '../components/Stories'
import Post from '../components/Post'
import PostSkeleton from '../components/PostSkeleton'
import SuggestedUsers from '../components/SuggestedUsers'
import BottomNav from '../components/BottomNav'
import { useAuth } from '../context/AuthContext'
import useDarkMode from '../hooks/useDarkMode'
import useFakeLoading from '../hooks/useFakeLoading'
import { posts } from '../data/mockData'

export default function Home() {
  const { user, logout } = useAuth()
  const [dark, toggleDark] = useDarkMode()
  const loading = useFakeLoading()
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return posts.filter((p) => !q || p.user.username.includes(q) || p.caption.toLowerCase().includes(q))
  }, [query])

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-black dark:text-neutral-100">
      <Navbar user={user} query={query} setQuery={setQuery} />
      <div className="mx-auto flex max-w-6xl">
        <Sidebar user={user} dark={dark} toggleDark={toggleDark} logout={logout} />
        <main className="mx-auto w-full max-w-[630px] px-4 pb-20 pt-4 md:pb-8">
          <Stories user={user} />
          {loading ? [1, 2].map((i) => <PostSkeleton key={i} />)
            : filtered.length ? filtered.map((p) => <Post key={p.id} post={p} me={user} />)
            : (
              <div className="flex flex-col items-center gap-2 py-20 text-center text-neutral-500">
                <SearchX size={40} aria-hidden="true" /><p className="font-semibold">No posts found</p>
                <button onClick={() => setQuery('')} className="rounded text-sm text-sky-500 hover:underline">Clear search</button>
              </div>
            )}
        </main>
        <SuggestedUsers user={user} />
      </div>
      <BottomNav user={user} dark={dark} toggleDark={toggleDark} />
    </div>
  )
}
