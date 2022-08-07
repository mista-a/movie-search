import { Outlet } from 'react-router-dom'
// import Footer from '../Footer/Footer'
import Header from '../Header/Header'

const Layout = () => {
  return (
    <div className='wrapper'>
      <Header />
      <div className='main'>
        <div className='container'>
          <Outlet />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default Layout
