import { createContext, useEffect, useState } from 'react'
import { authenticationAPI } from '../API/API'

export const AuthenticationContext = createContext()

export const AuthenticationProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState()

  const setLocalStorageSessionId = async (username, password) => {
    const newToken = await authenticationAPI.getNewToken()
    await authenticationAPI.postValidate(username, password, newToken)
    const sessionId = await authenticationAPI.createNewSession(newToken)
    localStorage.setItem('sessionId', sessionId)
    setSessionId(sessionId)
  }

  useEffect(() => {
    if (localStorage.getItem('sessionId')) {
      setSessionId(localStorage.getItem('sessionId'))
    }
  }, [])

  return (
    <AuthenticationContext.Provider
      value={{ sessionId, setLocalStorageSessionId }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}
