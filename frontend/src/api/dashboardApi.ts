import { apiGet } from './client'
import type {
  BudgetVsActual,
  CategoryAnalysis,
  Overview,
  Transaction,
} from '../types'

export const dashboardApi = {
  getOverview: () => apiGet<Overview>('/api/dashboard/overview'),
  getCategoryAnalysis: () =>
    apiGet<CategoryAnalysis[]>('/api/dashboard/category-analysis'),
  getBudgetVsActual: () =>
    apiGet<BudgetVsActual[]>('/api/dashboard/budget-vs-actual'),
  getRecentTransactions: (limit = 10) =>
    apiGet<Transaction[]>(`/api/transactions/recent?limit=${limit}`),
}
