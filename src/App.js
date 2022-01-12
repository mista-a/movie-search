import ProfilePage from './pages/ProfilePage'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import { MemoHeader } from './components/Header/Header'
import Layout from './components/Layout/Layout'
import MoviePage from './pages/MoviePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='profile' element={<ProfilePage />} />
          <Route path='movie/:id' element={<MoviePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
