import { createContext, useContext, useEffect, useState } from 'react'
import { LanguageContext } from '../contexts/LanguageContext'
import { genersAPI } from '../API/API'

export const GenersContext = createContext()

export const GenersProvider = ({ children }) => {
  const [genersList, setGeners] = useState()

  const { language } = useContext(LanguageContext)

  useEffect(() => {
    const getGeners = async (language) => {
      const geners = await genersAPI.getGeners(language)
      setGeners(geners)
    }

    if (!genersList) getGeners(language)
  }, [language])

  return (
    <GenersContext.Provider value={{ genersList }}>
      {children}
    </GenersContext.Provider>
  )
}
