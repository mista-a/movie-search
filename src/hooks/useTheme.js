import { useLayoutEffect, useState } from 'react'

const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    theme === 'dark'
      ? localStorage.setItem('theme', 'light')
      : localStorage.setItem('theme', 'dark')
    setTheme(localStorage.getItem('theme'))
  }

  return { theme, toggleTheme }
}

export default useTheme
