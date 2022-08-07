import { createContext, useContext, useEffect, useState } from 'react'
import { accountAPI, listsAPI } from '../API/API'
import { AuthenticationContext } from './AuthenticationContext'
import { LanguageContext } from './LanguageContext'

export const AccountContext = createContext()

export const AccountProvider = ({ children }) => {
  const [watchList, setWatchList] = useState({ results: [] })
  const [accountDetails, setAccountDetails] = useState({
    accountDetails: { id: 0 },
  })

  const { sessionId } = useContext(AuthenticationContext)
  const { language } = useContext(LanguageContext)

  const updateWatchlist = () => {
    getWatchList(accountDetails.id, sessionId, language, 1)
  }

  const getWatchList = async (
    accountDetailsId,
    sessionId,
    language,
    watchListPage
  ) => {
    const watchList = await listsAPI.getWatchList(
      accountDetailsId,
      sessionId,
      language,
      watchListPage
    )

    watchList.results.forEach((title) =>
      title.title ? (title.media_type = 'movie') : (title.media_type = 'tv')
    )

    setWatchList(watchList)
  }

  useEffect(() => {
    if (sessionId && language)
      getWatchList(accountDetails.id, sessionId, language, 1)
  }, [language, sessionId, accountDetails.id])

  useEffect(() => {
    const getAccountDetails = async (sessionId) => {
      const accountDetails = await accountAPI.getAccountDetails(sessionId)
      setAccountDetails(accountDetails)
    }

    if (sessionId) getAccountDetails(sessionId)
  }, [sessionId])

  return (
    <AccountContext.Provider
      value={{
        accountId: accountDetails.id,
        accountUsername: accountDetails.username,
        watchList,
        updateWatchlist,
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}
