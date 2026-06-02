import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import type { ReactNode } from 'react'
import { ThemeProvider, useTheme } from './ThemeProvider'

const wrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

describe('ThemeProvider / useTheme', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('defaults to light when nothing is stored', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current.theme).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('toggles to dark, applies the class, and persists the choice', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })

    act(() => result.current.toggleTheme())

    expect(result.current.theme).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(window.localStorage.getItem('dashboard-theme')).toBe('dark')
  })

  it('reads a previously stored theme on mount', () => {
    window.localStorage.setItem('dashboard-theme', 'dark')
    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current.theme).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('throws when used outside a provider', () => {
    expect(() => renderHook(() => useTheme())).toThrow(
      /must be used within a ThemeProvider/,
    )
  })
})
