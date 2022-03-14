import { createContext, useEffect, useState } from 'react'

export const FiltresContext = createContext()

export const FiltresProvider = ({ children }) => {
  const [filters, setFilters] = useState({ type: 'multi' })

  const filterByType = (contentType, type) => {
    if (type === 'multi' || contentType === type) {
      return true
    }
  }

  return (
    <FiltresContext.Provider value={{ filters, setFilters, filterByType }}>
      {children}
    </FiltresContext.Provider>
  )
}
