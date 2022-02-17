import { createContext, useContext, useEffect, useState } from 'react'
import { accountAPI } from '../API/API'
import { AuthenticationContext } from './AuthenticationContext'

export const AccountContext = createContext()

export const AccountProvider = ({ children }) => {
  const [accountDetails, setAccountDetails] = useState({
    accountDetails: { id: 0 },
  })

  const { sessionId } = useContext(AuthenticationContext)

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
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}
