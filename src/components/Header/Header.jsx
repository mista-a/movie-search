import logo from '../../assets/img/logo.svg'
import user_avatar__image from '../../assets/img/user-avatar.png'
import logout__image from '../../assets/img/logout.png'
import { memo, useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Modal from '../Modal/Modal'
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher'
import Registration from './Registration/Registration'

//fix normalniy external link sdelai пж, норм классы

const Header = () => {
  const [modalActive, setModalActive] = useState(false)

  return (
    <header className='header'>
      <Link to='profile' className='logo'>
        <img src={logo} alt='logo' className='logo__image' />
      </Link>
      <div className='user-controller'>
        {/* <Link to='/profile' className='user-avatar'>
          <img
            src={user_avatar__image}
            alt='user avatar'
            className='user-avatar__image'
          />
        </Link> */}
        <LanguageSwitcher />
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
            вход
          </button>
          <Modal active={modalActive} setActive={setModalActive}>
            <Registration />
            {/* <button
              style={{ height: 30, width: 30 }}
              onClick={() => getAuth()}
            ></button> */}
          </Modal>
        </div>
      </div>
    </header>
  )
}

export const MemoHeader = memo(Header)
