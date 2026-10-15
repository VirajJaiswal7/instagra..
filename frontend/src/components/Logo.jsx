// export default function Logo({ size = 'text-4xl', icon = false }) {
//   return (
//     <span className="inline-flex items-center gap-2" aria-label="Vibegram">
//       <svg viewBox="0 0 40 40" className={icon ? 'h-9 w-9' : 'h-8 w-8'} aria-hidden="true">
//         <defs><linearGradient id="vg" x1="0" y1="1" x2="1" y2="0">
//           <stop offset="0" stopColor="#f59e0b" /><stop offset=".5" stopColor="#ec4899" /><stop offset="1" stopColor="#7c3aed" />
//         </linearGradient></defs>
//         <rect width="40" height="40" rx="11" fill="url(#vg)" />
//         <path d="M9 14l8 14c1 1.7 3 1.7 4 0l10-17" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
//       </svg>
//       {!icon && <span className={`${size} font-extrabold tracking-tight bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 bg-clip-text text-transparent`}>Instagram</span>}
//     </span>
//   )
// }


export default function Logo({ size = 'text-4xl', icon = false }) {
  return (
    <span className="inline-flex items-center gap-2" aria-label="Instagram">
      <svg
        viewBox="0 0 40 40"
        className={icon ? 'h-9 w-9' : 'h-8 w-8'}
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="instagram-gradient"
            x1="0"
            y1="1"
            x2="1"
            y2="0"
          >
            <stop offset="0%" stopColor="#feda75" />
            <stop offset="30%" stopColor="#fa7e1e" />
            <stop offset="60%" stopColor="#d62976" />
            <stop offset="100%" stopColor="#4f5bd5" />
          </linearGradient>
        </defs>

        <rect
          width="40"
          height="40"
          rx="11"
          fill="url(#instagram-gradient)"
        />

        <rect
          x="8.5"
          y="8.5"
          width="23"
          height="23"
          rx="6.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.8"
        />

        <circle
          cx="20"
          cy="20"
          r="5.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.8"
        />

        <circle cx="27.5" cy="12.8" r="1.7" fill="#ffffff" />
      </svg>

      {!icon && (
        <span
          className={`${size} font-extrabold tracking-tight bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 bg-clip-text text-transparent`}
        >
          Instagram
        </span>
      )}
    </span>
  )
}
