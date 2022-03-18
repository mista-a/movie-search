import { useForm } from 'react-hook-form'
import { useContext, useState, useRef } from 'react'
import { AuthenticationContext } from '../../../contexts/AuthenticationContext'
import hidePassword from '../../../assets/img/hide-password.png'

//fix переписать библиотеку на свое решение

const LogIn = () => {
  const { setLocalStorageSessionId } = useContext(AuthenticationContext)
  const [showPassword, setShowPassword] = useState(false)

  const passwordInputRef = useRef()

  const toggleShowPassword = (e) => {
    e.preventDefault()
    setShowPassword(!showPassword)
    passwordInputRef.current.focus()
  }

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'onChange' })

  const onSubmit = async ({ username, password }) => {
    setLocalStorageSessionId(username, password)
  }

  return (
    <div className='logIn'>
      <div className='logIn-header'>
        <h1 className='logIn-header__text'>Войти</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='logIn__form'>
        <div className='logIn-username'>
          <label className='logIn-label logIn-username__label'>
            <span className='logIn-label__text '>Имя пользователя</span>
            <input
              className={
                errors?.username
                  ? 'logIn-input logIn-input_error logIn-username__input '
                  : 'logIn-input logIn-username__input'
              }
              {...register('username', { required: 'обязательное поле' })}
            />
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
                ref={passwordInputRef}
                {...register('password', { required: 'обязательное поле' })}
              />
              <div className='show-password'>
                <button
                  className='show-password__button'
                  onClick={toggleShowPassword}
                >
                  <img
                    className='show-password__img'
                    src={hidePassword}
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
        <div className='logIn-submit'>
          <input
            className={
              isValid
                ? 'logIn-submit__input '
                : 'logIn-submit__input logIn-submit__input_invalide'
            }
            type='submit'
            value='Войти'
            disabled={!isValid}
          />
        </div>
      </form>
    </div>
  )
}

export default LogIn
