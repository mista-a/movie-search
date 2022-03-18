import user_avatar__image from '../../../assets/img/user-avatar.png'
import Modal from '../../common/Modal/Modal'
import LogIn from './../LogIn/LogIn'
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { AuthenticationContext } from '../../../contexts/AuthenticationContext'
import { accountAPI } from '../../../API/API'
import { themoviedb } from '../../../links'

const LogInController = () => {
  const [loginModalActive, setLoginModalActive] = useState(false)
  const [accountDetails, setAccountDetails] = useState({
    avatar: { tmdb: { avatar_path: null } },
  })

  const { sessionId, deleteLocalStorageSessionId } = useContext(
    AuthenticationContext,
  )

  const redirectToRegistration = () => {
    window.open(`${themoviedb}/signup`)
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

  const showModalActive = () => {
    setLoginModalActive(true)
  }

  const logout = () => {
    deleteLocalStorageSessionId()
    setLoginModalActive(false)
  }

  return sessionId ? (
    <>
      <Link className='user-avatar' to='/profile'>
        <img
          className='user-avatar__image'
          src={
            accountDetails.avatar.tmdb.avatar_path
              ? `${themoviedb}/t/p/w32_and_h32_face/68p1kljJUOLLO8ItRsGwiWnW6H8.jpg`
              : user_avatar__image
          }
          alt='user avatar'
        />
      </Link>
      <button className='logout-button' onClick={logout}>
        <span className='logout-button__text'>выйти</span>
      </button>
    </>
  ) : (
    <>
      <div className='sign-up'>
        <button className='sign-up__button' onClick={redirectToRegistration}>
          <span className='sign-up__text'>регистрация</span>
        </button>
      </div>
      <div className='sign-in'>
        <button className='sign-in__button' onClick={showModalActive}>
          вход
        </button>
        <Modal active={loginModalActive} setActive={setLoginModalActive}>
          <LogIn />
        </Modal>
      </div>
    </>
  )
}

export default LogInController
