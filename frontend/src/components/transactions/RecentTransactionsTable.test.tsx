import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { RecentTransactionsTable } from './RecentTransactionsTable'
import type { Transaction } from '../../types'

const sample: Transaction[] = [
  {
    transactionNumber: 'TXN-000001',
    policyNumber: 'POL-2026-00001',
    category: 'Auto',
    type: 'ClaimPayout',
    status: 'Completed',
    amount: 1500,
    date: '2026-05-30T10:00:00',
  },
]

describe('RecentTransactionsTable', () => {
  it('renders a row per transaction with humanized type and formatted amount', () => {
    render(<RecentTransactionsTable transactions={sample} />)

    expect(screen.getByText('TXN-000001')).toBeInTheDocument()
    expect(screen.getByText('Claim Payout')).toBeInTheDocument()
    expect(screen.getByText('$1,500')).toBeInTheDocument()
    expect(screen.getByText('Completed')).toBeInTheDocument()
  })

  it('shows an empty state when there are no transactions', () => {
    render(<RecentTransactionsTable transactions={[]} />)
    expect(screen.getByText(/no transactions to display/i)).toBeInTheDocument()
  })
})
