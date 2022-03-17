import { ThemeProvider } from './ThemeContext'
import { AccountProvider } from './AccountContext'
import { AuthenticationProvider } from './AuthenticationContext'
import { FiltersProvider } from './FiltersContext'
import { GenersProvider } from './GenersContext'
import { LanguageProvider } from './LanguageContext'
import { HeaderSearchProvider } from './HeaderSearchContext'

export const ContextProvider = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthenticationProvider>
        <LanguageProvider>
          <AccountProvider>
            <GenersProvider>
              <FiltersProvider>
                <HeaderSearchProvider>{children}</HeaderSearchProvider>
              </FiltersProvider>
            </GenersProvider>
          </AccountProvider>
        </LanguageProvider>
      </AuthenticationProvider>
    </ThemeProvider>
  )
}
