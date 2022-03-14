import { AccountProvider } from './AccountContext'
import { AuthenticationProvider } from './AuthenticationContext'
import { FiltresProvider } from './FiltresContext'
import { GenersProvider } from './GenersContext'
import { LanguageProvider } from './LanguageContext'
import { SearchProvider } from './SearchContext'
import { ThemeProvider } from './ThemeContext'

export const ContextProvider = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthenticationProvider>
        <LanguageProvider>
          <AccountProvider>
            <GenersProvider>
              <FiltresProvider>
                <SearchProvider>{children}</SearchProvider>
              </FiltresProvider>
            </GenersProvider>
          </AccountProvider>
        </LanguageProvider>
      </AuthenticationProvider>
    </ThemeProvider>
  )
}
