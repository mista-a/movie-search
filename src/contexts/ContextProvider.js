import { AccountProvider } from './AccountContext'
import { AuthenticationProvider } from './AuthenticationContext'
import { GenersProvider } from './GenersContext'
import { LanguageProvider } from './LanguageContext'

export const ContextProvider = ({ children }) => {
  return (
    <AuthenticationProvider>
      <LanguageProvider>
        <AccountProvider>
          <GenersProvider>{children}</GenersProvider>
        </AccountProvider>
      </LanguageProvider>
    </AuthenticationProvider>
  )
}
