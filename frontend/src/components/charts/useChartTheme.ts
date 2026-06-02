import { useTheme } from '../../theme/ThemeProvider'

/**
 * Recharts colours are set via props (not Tailwind classes), so derive
 * grid / axis / tooltip colours from the active theme.
 */
export function useChartTheme() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return {
    grid: isDark ? '#334155' : '#e2e8f0',
    axisTick: isDark ? '#94a3b8' : '#64748b',
    tooltipStyle: {
      borderRadius: 8,
      border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
      backgroundColor: isDark ? '#1e293b' : '#ffffff',
      color: isDark ? '#e2e8f0' : '#0f172a',
    } as const,
    tooltipItemColor: isDark ? '#e2e8f0' : '#0f172a',
  }
}
