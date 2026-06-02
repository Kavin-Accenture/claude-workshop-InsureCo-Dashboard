import { describe, expect, it } from 'vitest'
import {
  formatCompactCurrency,
  formatCurrency,
  formatDate,
  formatNumber,
} from './format'

describe('format utils', () => {
  it('formats currency without fractional cents', () => {
    expect(formatCurrency(1234.56)).toBe('$1,235')
  })

  it('formats compact currency for large values', () => {
    expect(formatCompactCurrency(1_500_000)).toBe('$1.5M')
  })

  it('formats numbers with thousands separators', () => {
    expect(formatNumber(12345)).toBe('12,345')
  })

  it('formats ISO dates as a readable string', () => {
    expect(formatDate('2026-05-31T21:00:00')).toBe('May 31, 2026')
  })
})
