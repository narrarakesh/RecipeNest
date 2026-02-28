import { useEffect } from 'react'
import { useTheme, useToggleTheme } from '@/lib/store/useAppStore'

export function useThemeManager() {
  const theme = useTheme()
  const toggleTheme = useToggleTheme()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return { theme, toggleTheme }
}