export default function PostSkeleton() {
  return (
    <div className="animate-pulse space-y-3 border-b border-neutral-200 pb-4 dark:border-neutral-800" aria-hidden="true">
      <div className="flex items-center gap-3 py-3"><div className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-800" /><div className="h-3 w-28 rounded bg-neutral-200 dark:bg-neutral-800" /></div>
      <div className="aspect-square w-full rounded bg-neutral-200 dark:bg-neutral-800" />
      <div className="h-3 w-24 rounded bg-neutral-200 dark:bg-neutral-800" /><div className="h-3 w-2/3 rounded bg-neutral-200 dark:bg-neutral-800" />
    </div>
  )
}
