// Mirrors the C# DTOs returned by the backend (camelCase via System.Text.Json).

export interface Overview {
  totalPolicies: number
  activePolicies: number
  totalCoverage: number
  totalClaimsPaid: number
  pendingClaims: number
  totalPremiumCollected: number
}

export interface CategoryAnalysis {
  category: string
  policyCount: number
  totalClaimAmount: number
  totalPremium: number
}

export interface BudgetVsActual {
  category: string
  budgeted: number
  actual: number
  variance: number
}

export interface Transaction {
  transactionNumber: string
  policyNumber: string
  category: string
  type: string
  status: string
  amount: number
  date: string
}
