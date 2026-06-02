import { useDashboardData } from '../hooks/useDashboardData'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { ErrorState } from '../components/common/ErrorState'
import { PolicyOverview } from '../components/overview/PolicyOverview'
import { CategoryBarChart } from '../components/charts/CategoryBarChart'
import { BudgetVsActualChart } from '../components/charts/BudgetVsActualChart'
import { RecentTransactionsTable } from '../components/transactions/RecentTransactionsTable'

export function Dashboard() {
  const {
    overview,
    categoryAnalysis,
    budgetVsActual,
    transactions,
    loading,
    error,
    refetch,
  } = useDashboardData(10)

  return (
    <DashboardLayout onRefresh={refetch} refreshing={loading}>
      {loading && <LoadingSpinner label="Loading dashboard…" />}

      {!loading && error && <ErrorState message={error} onRetry={refetch} />}

      {!loading && !error && overview && (
        <div className="flex flex-col gap-6">
          <PolicyOverview overview={overview} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <CategoryBarChart data={categoryAnalysis} />
            <BudgetVsActualChart data={budgetVsActual} />
          </div>

          <RecentTransactionsTable transactions={transactions} />
        </div>
      )}
    </DashboardLayout>
  )
}
