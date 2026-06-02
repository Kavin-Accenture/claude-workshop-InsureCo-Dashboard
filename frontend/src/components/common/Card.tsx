import type { ReactNode } from 'react'

interface CardProps {
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export function Card({ title, subtitle, children, className = '' }: CardProps) {
  return (
    <section
      className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800 ${className}`}
    >
      {(title || subtitle) && (
        <header className="mb-4">
          {title && (
            <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
          )}
        </header>
      )}
      {children}
    </section>
  )
}
