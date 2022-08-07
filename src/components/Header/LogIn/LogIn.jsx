import { useForm } from 'react-hook-form'
import { useContext, useState } from 'react'
import { AuthenticationContext } from '../../../contexts/AuthenticationContext'
import Preloader from '../../common/Preloader/Preloader'
import hidePasswordImg from '../../../assets/img/open-eye.png'
import showPasswordImg from '../../../assets/img/light-open-eye.png'

//fix сделать норм иконки
//fix цвет прыгает на ошибке при фокусе
//fix валидэйшн

const LogIn = () => {
  const { setLocalStorageSessionId, authenticationFetching, logInError } =
    useContext(AuthenticationContext)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'onChange' })

  const toggleShowPassword = (e) => {
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  const onSubmit = ({ username, password }) => {
    setLocalStorageSessionId(username, password)
  }

  const { ref, ...passwordInput } = register('password')

  return (
    <div className='logIn'>
      <div className='logIn-header'>
        <h1 className='logIn-header__text'>Войти</h1>
        {logInError && (
          <p className='logIn-error__text'>Логин или пароль неверен</p>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='logIn__form'>
        <div className='logIn-username'>
          <label className='logIn-label logIn-username__label'>
            <span className='logIn-label__text '>Имя пользователя</span>
            <div className='logIn-input'>
              <input
                className={
                  errors?.username
                    ? 'logIn-input__input logIn-input_error logIn-username__input '
                    : 'logIn-input__input logIn-username__input'
                }
                {...register('username', { required: 'обязательное поле' })}
              />
            </div>
          </label>
        </div>
        <div className='logIn-error'>
          {errors?.username && (
            <span className='logIn-error__text'>
              {errors?.username?.message}
            </span>
          )}
        </div>
        <div className='logIn-password'>
          <label className='logIn-label logIn-password__label'>
            <span className='logIn-label__text'>Пароль</span>
            <div className='logIn-input'>
              <input
                className={
                  errors?.password
                    ? 'logIn-input__input logIn-input_error logIn-password__input '
                    : 'logIn-input__input logIn-password__input'
                }
                type={showPassword ? 'text' : 'password'}
                autoComplete='off'
                {...passwordInput}
                name='passwordInput'
                {...register('password', {
                  required: 'обязательное поле',
                })}
              />
              <div className='show-password'>
                <button
                  className='show-password__button'
                  onClick={toggleShowPassword}
                >
                  <img
                    className='show-password__img'
                    src={showPassword ? hidePasswordImg : showPasswordImg}
                    alt='show password'
                  />
                </button>
              </div>
            </div>
          </label>
          <div className='logIn-error'>
            {errors?.password && (
              <span className='logIn-error__text'>
                {errors?.password?.message}
              </span>
            )}
          </div>
          <div className='password-options'>
            <div className='password-reset'>
              <button className='password-reset__button'>
                <p className='password-reset__text'>забыли пароль?</p>
              </button>
            </div>
          </div>
        </div>
        <div className={'logIn-submit'}>
          {!authenticationFetching ? (
            <input
              className={
                isValid
                  ? 'logIn-submit__input logIn-submit__input_valid'
                  : 'logIn-submit__input logIn-submit__input_invalid'
              }
              type='submit'
              value='Войти'
              disabled={!isValid}
            />
          ) : (
            <Preloader />
          )}
        </div>
      </form>
    </div>
  )
}

export default LogIn
