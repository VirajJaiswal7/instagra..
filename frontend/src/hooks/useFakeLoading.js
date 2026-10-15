import { useEffect, useState } from 'react'
export default function useFakeLoading(ms = 900) {
  const [loading, setLoading] = useState(true)
  useEffect(() => { const t = setTimeout(() => setLoading(false), ms); return () => clearTimeout(t) }, [ms])
  return loading
}
