interface LoadingSpinnerProps {
  label?: string
}

export function LoadingSpinner({ label = 'Loading…' }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-slate-500 dark:text-slate-400">
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-brand-600 dark:border-slate-700 dark:border-t-brand-500"
        role="status"
        aria-label="Loading"
      />
      <p className="text-sm">{label}</p>
    </div>
  )
}
