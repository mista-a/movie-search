import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { MemoHeader } from '../Header/Header'

const Layout = () => {
  return (
    <div className='wrapper'>
      <MemoHeader />
      <div className='container'>
        <div className='main'>
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
