'use client'

import { useState, useCallback, useEffect } from 'react'

type Theme = 'light' | 'dark'
const THEME_CHANGE_EVENT = 'agiliza-theme-change'

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('light', theme === 'light')
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.setAttribute('data-theme', theme)
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('dark')

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('agiliza-theme', newTheme)
    applyTheme(newTheme)
    window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: newTheme }))
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  useEffect(() => {
    const storedTheme = localStorage.getItem('agiliza-theme')
    const initialTheme: Theme = storedTheme === 'light' || storedTheme === 'dark'
      ? storedTheme
      : window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'

    setThemeState(initialTheme)
    applyTheme(initialTheme)

    const handleThemeChange = (event: Event) => {
      const changedTheme = (event as CustomEvent<Theme>).detail
      setThemeState(changedTheme)
      applyTheme(changedTheme)
    }

    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange)
    return () => window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange)
  }, [])

  return { theme, toggleTheme, setTheme }
}
