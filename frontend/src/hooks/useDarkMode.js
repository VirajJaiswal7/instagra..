import { useEffect, useState } from 'react'
export default function useDarkMode() {
  const [dark, setDark] = useState(() => localStorage.getItem('vibegram_theme') === 'dark')
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('vibegram_theme', dark ? 'dark' : 'light')
  }, [dark])
  return [dark, () => setDark((d) => !d)]
}
