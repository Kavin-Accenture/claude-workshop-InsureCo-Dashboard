import type { Overview } from '../../types'
import { formatCompactCurrency, formatNumber } from '../../utils/format'
import { SummaryCard } from './SummaryCard'

interface PolicyOverviewProps {
  overview: Overview
}

export function PolicyOverview({ overview }: PolicyOverviewProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <SummaryCard
        label="Total Policies"
        value={formatNumber(overview.totalPolicies)}
        icon="📄"
        accent="blue"
      />
      <SummaryCard
        label="Active Policies"
        value={formatNumber(overview.activePolicies)}
        icon="✅"
        accent="green"
      />
      <SummaryCard
        label="Total Coverage"
        value={formatCompactCurrency(overview.totalCoverage)}
        icon="🛡️"
        accent="violet"
      />
      <SummaryCard
        label="Claims Paid"
        value={formatCompactCurrency(overview.totalClaimsPaid)}
        icon="💸"
        accent="amber"
      />
      <SummaryCard
        label="Pending Claims"
        value={formatNumber(overview.pendingClaims)}
        icon="⏳"
        accent="slate"
      />
      <SummaryCard
        label="Premium Collected"
        value={formatCompactCurrency(overview.totalPremiumCollected)}
        icon="💰"
        accent="green"
      />
    </div>
  )
}
