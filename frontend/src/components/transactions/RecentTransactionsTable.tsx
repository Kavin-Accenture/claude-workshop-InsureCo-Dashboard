import type { Transaction } from '../../types'
import { Card } from '../common/Card'
import { formatCurrency, formatDate } from '../../utils/format'

interface RecentTransactionsTableProps {
  transactions: Transaction[]
}

const statusStyles: Record<string, string> = {
  Completed:
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400',
  Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400',
  Failed: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400',
}

function StatusPill({ status }: { status: string }) {
  const style =
    statusStyles[status] ??
    'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${style}`}
    >
      {status}
    </span>
  )
}

/** Splits a PascalCase type (e.g. "ClaimPayout") into "Claim Payout". */
function humanizeType(type: string): string {
  return type.replace(/([a-z])([A-Z])/g, '$1 $2')
}

export function RecentTransactionsTable({
  transactions,
}: RecentTransactionsTableProps) {
  return (
    <Card title="Recent Transactions" subtitle="Latest activity across all policies">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-700 dark:text-slate-400">
              <th className="px-3 py-2 font-medium">Transaction</th>
              <th className="px-3 py-2 font-medium">Policy</th>
              <th className="px-3 py-2 font-medium">Category</th>
              <th className="px-3 py-2 font-medium">Type</th>
              <th className="px-3 py-2 font-medium">Status</th>
              <th className="px-3 py-2 text-right font-medium">Amount</th>
              <th className="px-3 py-2 text-right font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-3 py-8 text-center text-slate-400 dark:text-slate-500">
                  No transactions to display.
                </td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <tr
                  key={tx.transactionNumber}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50 dark:border-slate-700/60 dark:hover:bg-slate-700/40"
                >
                  <td className="px-3 py-2.5 font-medium text-slate-700 dark:text-slate-200">
                    {tx.transactionNumber}
                  </td>
                  <td className="px-3 py-2.5 text-slate-600 dark:text-slate-300">
                    {tx.policyNumber}
                  </td>
                  <td className="px-3 py-2.5 text-slate-600 dark:text-slate-300">
                    {tx.category}
                  </td>
                  <td className="px-3 py-2.5 text-slate-600 dark:text-slate-300">
                    {humanizeType(tx.type)}
                  </td>
                  <td className="px-3 py-2.5">
                    <StatusPill status={tx.status} />
                  </td>
                  <td className="px-3 py-2.5 text-right font-medium text-slate-800 dark:text-slate-100">
                    {formatCurrency(tx.amount)}
                  </td>
                  <td className="px-3 py-2.5 text-right text-slate-500 dark:text-slate-400">
                    {formatDate(tx.date)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
