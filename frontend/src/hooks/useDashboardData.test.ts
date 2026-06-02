import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useDashboardData } from './useDashboardData'
import { dashboardApi } from '../api/dashboardApi'

vi.mock('../api/dashboardApi', () => ({
  dashboardApi: {
    getOverview: vi.fn(),
    getCategoryAnalysis: vi.fn(),
    getBudgetVsActual: vi.fn(),
    getRecentTransactions: vi.fn(),
  },
}))

const mockedApi = vi.mocked(dashboardApi)

const overview = {
  totalPolicies: 60,
  activePolicies: 40,
  totalCoverage: 1000,
  totalClaimsPaid: 200,
  pendingClaims: 1,
  totalPremiumCollected: 300,
}

describe('useDashboardData', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('loads all datasets and clears the loading flag', async () => {
    mockedApi.getOverview.mockResolvedValue(overview)
    mockedApi.getCategoryAnalysis.mockResolvedValue([])
    mockedApi.getBudgetVsActual.mockResolvedValue([])
    mockedApi.getRecentTransactions.mockResolvedValue([])

    const { result } = renderHook(() => useDashboardData())

    expect(result.current.loading).toBe(true)
    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.overview).toEqual(overview)
    expect(result.current.error).toBeNull()
    expect(mockedApi.getRecentTransactions).toHaveBeenCalledWith(10)
  })

  it('surfaces an error message when a request fails', async () => {
    mockedApi.getOverview.mockRejectedValue(new Error('API down'))
    mockedApi.getCategoryAnalysis.mockResolvedValue([])
    mockedApi.getBudgetVsActual.mockResolvedValue([])
    mockedApi.getRecentTransactions.mockResolvedValue([])

    const { result } = renderHook(() => useDashboardData())

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).toBe('API down')
    expect(result.current.overview).toBeNull()
  })
})
