import { AuthenticationProvider } from './AuthenticationContext'
import { GenersProvider } from './GenersContext'
import { LanguageProvider } from './LanguageContext'

export const ContextProvider = ({ children }) => {
  return (
    <AuthenticationProvider>
      <LanguageProvider>
        <GenersProvider>{children}</GenersProvider>
      </LanguageProvider>
    </AuthenticationProvider>
  )
}
