import { createContext, useEffect, useState } from 'react'

export const FiltresContext = createContext()

export const FiltresProvider = ({ children }) => {
  const [filters, setFilters] = useState({ type: 'multi', adult: false })

  const filterByType = (contentType, type) => {
    if (type === 'multi' || contentType === type) {
      return true
    }
  }

  const filterByAdult = (contentAdult, adult) => {
    if (contentAdult === adult) {
      return true
    }
  }

  return (
    <FiltresContext.Provider
      value={{ filters, setFilters, filterByType, filterByAdult }}
    >
      {children}
    </FiltresContext.Provider>
  )
}
