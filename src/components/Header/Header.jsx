import logo from '../../assets/img/logo.svg'
import user_avatar__image from '../../assets/img/user-avatar.png'
import logout__image from '../../assets/img/logout.png'
import { memo } from 'react'

const Header = (props) => {
  return (
    <header className='header'>
      <a href='#' className='logo'>
        <img src={logo} alt='logo' className='logo__image' />
      </a>
      <div className='user-controller'>
        <a href='#' className='user-avatar'>
          <img
            src={user_avatar__image}
            alt='user avatar'
            className='user_avatar__image'
          />
        </a>
        <button href='#' className='logout'>
          <img
            src={logout__image}
            alt='logout button'
            className='logout__image'
          />
        </button>
      </div>
    </header>
  )
}

export const MemoHeader = memo(Header)
