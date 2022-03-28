import { createContext, useEffect, useState } from 'react'
import { authenticationAPI } from '../API/API'

export const AuthenticationContext = createContext()

export const AuthenticationProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState()
  const [authenticationFetching, setAuthenticationFetching] = useState(false)
  const [logInError, setlogInError] = useState(false)

  const setLocalStorageSessionId = async (username, password) => {
    setAuthenticationFetching(true)
    setlogInError(false)
    try {
      const newToken = await authenticationAPI.getNewToken()
      await authenticationAPI.postValidate(username, password, newToken)
      const sessionId = await authenticationAPI.createNewSession(newToken)
      localStorage.setItem('sessionId', sessionId)
      setSessionId(sessionId)
    } catch {
      setlogInError(true)
    } finally {
      setAuthenticationFetching(false)
    }
  }

  const deleteLocalStorageSessionId = () => {
    localStorage.removeItem('sessionId')
    setSessionId(null)
  }

  useEffect(() => {
    if (localStorage.getItem('sessionId')) {
      setSessionId(localStorage.getItem('sessionId'))
    }
  }, [])

  return (
    <AuthenticationContext.Provider
      value={{
        sessionId,
        setLocalStorageSessionId,
        deleteLocalStorageSessionId,
        authenticationFetching,
        logInError,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}
