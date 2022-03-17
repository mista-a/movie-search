import { Routes, BrowserRouter, Route } from 'react-router-dom'
import { ContextProvider } from './contexts/ContextProvider'
import Layout from './components/Layout/Layout'
import SearchPage from './pages/SearchPage/SearchPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import TitlePage from './pages/TitlePage/TitlePage'
import PersonPage from './pages/PersonPage/PersonPage'

//fix язык сам по себе меняется

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='search' element={<SearchPage />} />
            <Route path='profile' element={<ProfilePage />} />
            <Route path=':titleType/:titleId' element={<TitlePage />} />
            <Route path='person/:personId' element={<PersonPage />} />
          </Route>
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  )
}

export default App
