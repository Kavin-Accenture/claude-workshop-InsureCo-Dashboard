interface ErrorStateProps {
  message: string
  onRetry?: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-red-200 bg-red-50 py-16 text-center dark:border-red-900 dark:bg-red-950">
      <div>
        <p className="text-base font-semibold text-red-700 dark:text-red-400">
          Something went wrong
        </p>
        <p className="mt-1 max-w-md text-sm text-red-600 dark:text-red-300">
          {message}
        </p>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
        >
          Try again
        </button>
      )}
    </div>
  )
}
