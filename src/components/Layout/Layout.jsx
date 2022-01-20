import { Link, Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { MemoHeader } from '../Header/Header'

const Layout = () => {
  return (
    <>
      <div className='wrapper'>
        <div className='margin-fix'></div>
        <div className='container'>
          <MemoHeader />
          <Outlet />
          {/* <Footer /> */}
        </div>
      </div>
    </>
  )
}

export default Layout
