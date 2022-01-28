import logo from '../../assets/img/logo.svg'
import user_avatar__image from '../../assets/img/user-avatar.png'
import logout__image from '../../assets/img/logout.png'
import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../Modal/Modal'

const Header = (props) => {
  const [modalActive, setModalActive] = useState(false)
  return (
    <header className='header'>
      <a href='#' className='logo'>
        <img src={logo} alt='logo' className='logo__image' />
      </a>
      <div className='user-controller'>
        {/* <Link to='/profile' className='user-avatar'>
          <img
            src={user_avatar__image}
            alt='user avatar'
            className='user-avatar__image'
          />
        </Link> */}
        <div className='sign-up'>
          <button href='#' className='sign-up__button'>
            <span className='sign-up__text'>регистрация</span>
          </button>
        </div>
        <div className='sign-in'>
          <button
            href='#'
            className='sign-in__button'
            onClick={() => setModalActive(true)}
          >
            <span className='sign-in__text'>вход</span>
          </button>
          <Modal active={modalActive} setActive={setModalActive}></Modal>
        </div>
      </div>
    </header>
  )
}

export const MemoHeader = memo(Header)
