import { AccountProvider } from './AccountContext'
import { AuthenticationProvider } from './AuthenticationContext'
import { GenersProvider } from './GenersContext'
import { LanguageProvider } from './LanguageContext'
import { SearchProvider } from './SearchContenxt'

export const ContextProvider = ({ children }) => {
  return (
    <AuthenticationProvider>
      <LanguageProvider>
        <AccountProvider>
          <GenersProvider>
            <SearchProvider>{children}</SearchProvider>
          </GenersProvider>
        </AccountProvider>
      </LanguageProvider>
    </AuthenticationProvider>
  )
}
