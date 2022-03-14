import { createContext, useEffect, useState } from 'react'

export const SearchContext = createContext()

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [delaySearchQuery, setDelaySearchQuery] = useState('')

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDelaySearchQuery(searchQuery)
    }, 300)
    return () => clearTimeout(timeOutId)
  }, [searchQuery])

  return (
    <SearchContext.Provider
      value={{ searchQuery, setSearchQuery, delaySearchQuery }}
    >
      {children}
    </SearchContext.Provider>
  )
}
