import { useTheme } from '../../theme/ThemeProvider'

interface HeaderProps {
  onRefresh?: () => void
  refreshing?: boolean
}

export function Header({ onRefresh, refreshing = false }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <header className="border-b border-slate-200 bg-white transition-colors dark:border-slate-700 dark:bg-slate-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            Policy Overview Dashboard
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Insurance claims processing · portfolio at a glance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-base transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:hover:bg-slate-600"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={refreshing}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
            >
              {refreshing ? 'Refreshing…' : 'Refresh'}
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
