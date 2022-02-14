import logo from '../../assets/img/logo.svg'
import user_avatar__image from '../../assets/img/user-avatar.png'
// import logout__image from '../../assets/img/logout.png'
import { memo, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../Modal/Modal'
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher'
import Registration from './Registration/Registration'
import { AuthenticationContext } from '../../contexts/AuthenticationContext'
import { accountAPI } from '../../API/API'

//fix норм классы, переделай закрытие входа на submite форм, подумай над переносам входа в "Registration"
//fix определись с выходом
//fix jxs у тя гавнище
//fix сделать одну общую ссылку для фото в themoviedb

const Header = () => {
  const [loginModalActive, setLoginModalActive] = useState(false)
  const [accountDetails, setAccountDetails] = useState({
    avatar: { tmdb: { avatar_path: null } },
  })

  const { sessionId, deleteLocalStorageSessionId } = useContext(
    AuthenticationContext,
  )

  const redirectToRegistration = () => {
    window.open(`https://www.themoviedb.org/signup`)
  }

  const toggleModalActive = () => {
    setLoginModalActive(!loginModalActive)
  }

  const logout = () => {
    deleteLocalStorageSessionId()
    toggleModalActive()
  }

  useEffect(() => {
    const getAccountDetails = async (sessionId) => {
      if (sessionId) {
        const accountDetails = await accountAPI.getAccountDetails(sessionId)
        setAccountDetails(accountDetails)
      }
    }

    getAccountDetails(sessionId)
  }, [sessionId])

  return (
    <header className='header'>
      <Link to='profile' className='logo'>
        <img src={logo} alt='logo' className='logo__image' />
      </Link>
      <div className='user-controller'>
        {sessionId ? (
          <>
            <LanguageSwitcher />
            <Link to='/profile' className='user-avatar'>
              <img
                src={
                  accountDetails.avatar.tmdb.avatar_path
                    ? `https://www.themoviedb.org/t/p/w32_and_h32_face/68p1kljJUOLLO8ItRsGwiWnW6H8.jpg`
                    : user_avatar__image
                }
                alt='user avatar'
                className='user-avatar__image'
              />
            </Link>
            <button className='logout-button' onClick={logout}>
              <span className='logout-button__text'>выйти</span>
            </button>
          </>
        ) : (
          <>
            <LanguageSwitcher />
            <div className='sign-up'>
              <button
                href='#'
                className='sign-up__button'
                onClick={redirectToRegistration}
              >
                <span className='sign-up__text'>регистрация</span>
              </button>
            </div>
            <div className='sign-in'>
              <button
                href='#'
                className='sign-in__button'
                onClick={toggleModalActive}
              >
                вход
              </button>
              <Modal active={loginModalActive} setActive={setLoginModalActive}>
                <Registration />
              </Modal>
            </div>
          </>
        )}
      </div>
    </header>
  )
}

export const MemoHeader = memo(Header)
