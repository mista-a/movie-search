import { useLayoutEffect, useEffect, useState } from 'react'

const useTheme = () => {
  const [theme, setTheme] = useState('dark')

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark')
  }

  return { theme, toggleTheme }
}

export default useTheme
