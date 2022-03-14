import { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark')

  const switchTheme = () => {
    theme === 'dark'
      ? localStorage.setItem('theme', 'light')
      : localStorage.setItem('theme', 'dark')
    setTheme(localStorage.getItem('theme'))
  }

  useEffect(() => {
    if (!localStorage.getItem('theme')) localStorage.setItem('theme', 'dark')
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
