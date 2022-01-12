import { Link, Outlet } from 'react-router-dom'
import { MemoHeader } from '../Header/Header'

const Layout = () => {
  return (
    <>
      <div className='wrapper'>
        <div className='margin-fix'></div>
        <div className='container'>
          <MemoHeader />
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout
