import { useCallback, useEffect, useState } from 'react'
import { dashboardApi } from '../api/dashboardApi'
import type {
  BudgetVsActual,
  CategoryAnalysis,
  Overview,
  Transaction,
} from '../types'

interface DashboardData {
  overview: Overview | null
  categoryAnalysis: CategoryAnalysis[]
  budgetVsActual: BudgetVsActual[]
  transactions: Transaction[]
}

interface UseDashboardDataResult extends DashboardData {
  loading: boolean
  error: string | null
  refetch: () => void
}

const EMPTY: DashboardData = {
  overview: null,
  categoryAnalysis: [],
  budgetVsActual: [],
  transactions: [],
}

/**
 * Loads every dataset the dashboard needs in parallel and exposes a single
 * loading/error/refetch surface for the page to render against.
 */
export function useDashboardData(transactionLimit = 10): UseDashboardDataResult {
  const [data, setData] = useState<DashboardData>(EMPTY)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [overview, categoryAnalysis, budgetVsActual, transactions] =
        await Promise.all([
          dashboardApi.getOverview(),
          dashboardApi.getCategoryAnalysis(),
          dashboardApi.getBudgetVsActual(),
          dashboardApi.getRecentTransactions(transactionLimit),
        ])
      setData({ overview, categoryAnalysis, budgetVsActual, transactions })
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to load dashboard data. Is the API running?',
      )
      setData(EMPTY)
    } finally {
      setLoading(false)
    }
  }, [transactionLimit])

  useEffect(() => {
    void load()
  }, [load])

  return { ...data, loading, error, refetch: load }
}
