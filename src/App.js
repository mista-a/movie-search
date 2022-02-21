import ProfilePage from './pages/ProfilePage'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import MoviePage from './pages/MoviePage'
import TvPage from './pages/TvPage'
import PersonPage from './pages/PersonPage'
import SearchPage from './pages/SearchPage'
import { ContextProvider } from './contexts/ContextProvider'

//fix в низу хуйня какая то

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='search' element={<SearchPage />} />
            <Route path='profile' element={<ProfilePage />} />
            <Route path='movie/:titleId' element={<MoviePage />} />
            <Route path='tv/:titleId' element={<TvPage />} />
            <Route path='person/:personId' element={<PersonPage />} />
          </Route>
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  )
}

export default App
