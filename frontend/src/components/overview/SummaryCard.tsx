import type { ReactNode } from 'react'

interface SummaryCardProps {
  label: string
  value: string
  icon: ReactNode
  accent?: 'blue' | 'green' | 'amber' | 'violet' | 'slate'
}

const accentClasses: Record<NonNullable<SummaryCardProps['accent']>, string> = {
  blue: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  green: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
  amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  violet: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400',
  slate: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
}

export function SummaryCard({
  label,
  value,
  icon,
  accent = 'blue',
}: SummaryCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-lg text-lg ${accentClasses[accent]}`}
        aria-hidden
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm text-slate-500 dark:text-slate-400">{label}</p>
        <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
      </div>
    </div>
  )
}
