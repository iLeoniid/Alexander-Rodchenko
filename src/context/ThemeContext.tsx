import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type AccentColor = 'red' | 'amarillo' | 'azul' | 'naranja' | 'blanco'
type FontSize = 'chico' | 'medio' | 'grande'

interface Theme {
  mode: 'light' | 'dark'
  accent: AccentColor
  fontSize: FontSize
}

interface ThemeContextValue {
  theme: Theme
  toggleMode: () => void
  setAccent: (c: AccentColor) => void
  setFontSize: (s: FontSize) => void
}

const accents: Record<AccentColor, string> = {
  red: '#E53935',
  amarillo: '#F4C430',
  azul: '#2C3E8F',
  naranja: '#E67E22',
  blanco: '#F5F0EB',
}

const fontScale: Record<FontSize, number> = {
  chico: 0.875,
  medio: 1,
  grande: 1.125,
}

function getSystemMode(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem('rodchenko-theme')
    if (stored) {
      const parsed = JSON.parse(stored)
      return { mode: getSystemMode(), accent: parsed.accent || 'red', fontSize: parsed.fontSize || 'medio' }
    }
  } catch {}
  return { mode: getSystemMode(), accent: 'red', fontSize: 'medio' }
}

function hexToRgba(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    localStorage.setItem('rodchenko-theme', JSON.stringify({ accent: theme.accent, fontSize: theme.fontSize }))
    const root = document.documentElement
    const accent = accents[theme.accent]

    root.style.setProperty('--color-red', accent)
    root.style.setProperty('--color-red-rgb', hexToRgba(accent))
    root.style.setProperty('--color-red-dark', theme.accent === 'red' ? '#C62828' : accent)

    if (theme.mode === 'light') {
      root.style.setProperty('--color-black', '#1A1A1A')
      root.style.setProperty('--color-off-white', '#F5F0EB')
      root.style.setProperty('--color-white', '#FFFFFF')
      root.style.setProperty('--bg-primary', '#F5F0EB')
      root.style.setProperty('--bg-secondary', '#FFFFFF')
      root.style.setProperty('--text-primary', '#1A1A1A')
      root.style.setProperty('--text-secondary', '#757575')
    } else {
      root.style.setProperty('--color-black', '#0D0D0D')
      root.style.setProperty('--color-off-white', '#1A1A1A')
      root.style.setProperty('--color-white', '#FFFFFF')
      root.style.setProperty('--bg-primary', '#0D0D0D')
      root.style.setProperty('--bg-secondary', '#1A1A1A')
      root.style.setProperty('--text-primary', '#F5F0EB')
      root.style.setProperty('--text-secondary', '#9E9E9E')
    }

    root.style.setProperty('--font-scale', String(fontScale[theme.fontSize]))

    root.style.setProperty('--transition-theme', 'background-color 0.5s ease, color 0.4s ease, border-color 0.3s ease')
  }, [theme])

  const toggleMode = () =>
    setTheme(prev => ({ ...prev, mode: prev.mode === 'dark' ? 'light' : 'dark' }))

  const setAccent = (accent: AccentColor) =>
    setTheme(prev => ({ ...prev, accent }))

  const setFontSize = (fontSize: FontSize) =>
    setTheme(prev => ({ ...prev, fontSize }))

  return (
    <ThemeContext.Provider value={{ theme, toggleMode, setAccent, setFontSize }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

export type { AccentColor, FontSize }
export { accents, fontScale }
