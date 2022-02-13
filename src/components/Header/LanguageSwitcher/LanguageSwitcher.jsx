import { useEffect } from 'react'
import { useContext, useState } from 'react'
import { languageAPI } from '../../../API/API'
import { LanguageContext } from '../../../contexts/LanguageContext'

const LanguageSwitcher = () => {
  const [translations, setTranslations] = useState([])
  const [languageSwitcher, setlanguageSwitcher] = useState(false)
  const { language, setLocalStorageLanguage } = useContext(LanguageContext)

  const switchLanguageSwitcher = () => setlanguageSwitcher(!languageSwitcher)

  useEffect(() => {
    const getTranslations = async () => {
      const translations = await languageAPI.getTranslations()
      setTranslations(translations)
    }

    getTranslations()
  }, [])

  return (
    <div className='language-switcher'>
      <button
        className='language-switcher__button'
        onClick={switchLanguageSwitcher}
      >
        <span className='language-switcher__text'>{language}</span>
      </button>
      <div
        className={
          languageSwitcher
            ? 'language-switcher__menu language-switcher__menu_show'
            : 'language-switcher__menu language-switcher__menu_hide'
        }
      >
        {translations.map((language, index) => (
          <button
            key={index}
            className='language-switcher__language'
            value={language}
            onClick={(e) => setLocalStorageLanguage(e.target.value)}
          >
            {language}
          </button>
        ))}
      </div>
    </div>
  )
}

export default LanguageSwitcher
