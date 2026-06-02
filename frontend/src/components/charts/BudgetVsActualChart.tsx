import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { BudgetVsActual } from '../../types'
import { Card } from '../common/Card'
import { formatCompactCurrency, formatCurrency } from '../../utils/format'
import { useChartTheme } from './useChartTheme'

interface BudgetVsActualChartProps {
  data: BudgetVsActual[]
}

export function BudgetVsActualChart({ data }: BudgetVsActualChartProps) {
  const chart = useChartTheme()
  return (
    <Card
      title="Budget vs Actual"
      subtitle="Reserved claim budget vs amount actually paid out, per category"
    >
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} vertical={false} />
            <XAxis dataKey="category" tick={{ fontSize: 12, fill: chart.axisTick }} />
            <YAxis
              tickFormatter={(value: number) => formatCompactCurrency(value)}
              tick={{ fontSize: 12, fill: chart.axisTick }}
              width={70}
            />
            <Tooltip
              formatter={(value) => formatCurrency(Number(value))}
              contentStyle={chart.tooltipStyle}
              itemStyle={{ color: chart.tooltipItemColor }}
              cursor={{ fill: chart.grid, fillOpacity: 0.3 }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar
              dataKey="budgeted"
              name="Budgeted (Reserved)"
              fill="#8b5cf6"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="actual"
              name="Actual (Paid)"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
