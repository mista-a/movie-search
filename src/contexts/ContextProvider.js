import { AccountProvider } from './AccountContext'
import { AuthenticationProvider } from './AuthenticationContext'
import { FiltersProvider } from './FiltersContext'
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
              <FiltersProvider>
                <SearchProvider>{children}</SearchProvider>
              </FiltersProvider>
            </GenersProvider>
          </AccountProvider>
        </LanguageProvider>
      </AuthenticationProvider>
    </ThemeProvider>
  )
}
