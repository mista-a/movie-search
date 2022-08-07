import { createContext, useState } from 'react'
// import { languageAPI } from '../API/API'

export const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ru-Ru')

  const setLocalStorageLanguage = (language) => {
    localStorage.setItem('language', language)
    setLanguage(language)
  }

  // useEffect(() => {
  //   const getGeo = async () => {
  //     const geo = await languageAPI.getGeo()
  //     setLocalStorageLanguage(geo.country)
  //   }

  //   localStorage.getItem('language')
  //     ? setLanguage(localStorage.getItem('language'))
  //     : getGeo()
  // }, [])

  return (
    <LanguageContext.Provider value={{ language, setLocalStorageLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
