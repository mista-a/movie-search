import ProfilePage from './pages/ProfilePage'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import MoviePage from './pages/MoviePage'
import TvPage from './pages/TvPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='profile' element={<ProfilePage />} />
          <Route path='/movie/:id' element={<MoviePage />} />
          <Route path='/tv/:id' element={<TvPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
