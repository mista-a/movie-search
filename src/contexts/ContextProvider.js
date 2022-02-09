import { AuthenticationProvider } from './AuthenticationContext'
import { LanguageProvider } from './LanguageContext'

export const ContextProvider = ({ children }) => {
  return (
    <AuthenticationProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </AuthenticationProvider>
  )
}
