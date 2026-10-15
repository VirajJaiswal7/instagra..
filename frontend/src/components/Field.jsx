import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function Field({ label, error, type = 'text', ...props }) {
  const [show, setShow] = useState(false)
  const isPw = type === 'password'
  return (
    <div>
      <label className="sr-only" htmlFor={props.id}>{label}</label>
      <div className="relative">
        <input {...props} type={isPw && show ? 'text' : type} placeholder={label} aria-invalid={!!error}
          aria-describedby={error ? `${props.id}-err` : undefined}
          className={`w-full rounded-md border bg-neutral-50 px-3 py-2.5 pr-11 text-sm text-neutral-900 outline-none transition focus:border-neutral-500 ${error ? 'border-red-500' : 'border-neutral-300'}`} />
        {isPw && (
          <button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-neutral-500 hover:text-neutral-900">
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p id={`${props.id}-err`} role="alert" className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}
