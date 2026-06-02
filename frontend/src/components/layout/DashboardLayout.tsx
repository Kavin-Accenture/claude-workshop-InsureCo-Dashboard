import type { ReactNode } from 'react'
import { Header } from './Header'

interface DashboardLayoutProps {
  children: ReactNode
  onRefresh?: () => void
  refreshing?: boolean
}

export function DashboardLayout({
  children,
  onRefresh,
  refreshing,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100 transition-colors dark:bg-slate-900">
      <Header onRefresh={onRefresh} refreshing={refreshing} />
      <main className="mx-auto max-w-7xl px-6 py-6">{children}</main>
    </div>
  )
}
