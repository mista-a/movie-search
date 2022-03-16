import { createContext, useEffect, useState } from 'react'

export const FiltersContext = createContext()

export const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    type: 'multi',
    startReleaseDate: 1,
    endReleaseDate: 2022,
  })

  const filterByType = (contentType, type) => {
    if (type === 'multi' || contentType === type) {
      return true
    }
  }

  const filterByReleaseDate = (
    contentReleaseDate,
    startReleaseDate,
    endReleaseDate,
  ) => {
    if (
      contentReleaseDate > startReleaseDate &&
      contentReleaseDate < endReleaseDate
    ) {
      return true
    }
  }

  console.log(filters)

  return (
    <FiltersContext.Provider
      value={{ filters, setFilters, filterByType, filterByReleaseDate }}
    >
      {children}
    </FiltersContext.Provider>
  )
}
