import { Smartphone } from 'lucide-react'
import Logo from './Logo'

const links = ['About', 'Help', 'Privacy', 'Terms', 'Language']
const Badge = ({ small, big }) => (
  <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2 rounded-lg bg-black px-3 py-1.5 text-white transition hover:bg-neutral-800">
    <Smartphone size={20} aria-hidden="true" />
    <span className="text-left leading-tight"><span className="block text-[10px]">{small}</span><span className="block text-sm font-semibold">{big}</span></span>
  </a>
)

export default function AuthLayout({ children, below }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-8">
        <div className="w-full max-w-[350px] rounded-xl border border-neutral-300 bg-white px-6 py-8 shadow-sm sm:px-10 max-sm:max-w-full">
          <div className="mb-6 flex justify-center"><Logo /></div>
          {children}
        </div>
        <div className="w-full max-w-[350px] rounded-xl border border-neutral-300 p-5 text-center text-sm text-neutral-800 max-sm:max-w-full">{below}</div>
        <div className="mt-2 text-center">
          <p className="mb-3 text-sm text-neutral-800">Get the app.</p>
          <div className="flex justify-center gap-2"><Badge small="Download on the" big="App Store" /><Badge small="GET IT ON" big="Google Play" /></div>
        </div>
      </main>
      <footer className="px-4 pb-6">
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-neutral-500">
          {links.map((l) => <li key={l}><a href="#" onClick={(e) => e.preventDefault()} className="rounded hover:underline">{l}</a></li>)}
          <li>© 2026 Instagram</li>
        </ul>
      </footer>
    </div>
  )
}
