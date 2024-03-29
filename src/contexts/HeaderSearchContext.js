import { createContext, useEffect, useState } from 'react'

export const HeaderSearchContext = createContext()

export const HeaderSearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [delaySearchQuery, setDelaySearchQuery] = useState('')
  const [searchDescription, setSearchDescription] = useState('')

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDelaySearchQuery(searchQuery)
    }, 300)
    return () => clearTimeout(timeOutId)
  }, [searchQuery])

  return (
    <HeaderSearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        delaySearchQuery,
        searchDescription,
        setSearchDescription,
      }}
    >
      {children}
    </HeaderSearchContext.Provider>
  )
}
