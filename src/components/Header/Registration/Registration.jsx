import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { AuthenticationContext } from '../../../contexts/AuthenticationContext'

//fix перенаименовать компоненту
// ne fix тут бэм просто пушка вроде

const Registration = () => {
  const { setLocalStorageSessionId } = useContext(AuthenticationContext)

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'onBlur' })

  const onSubmit = async ({ username, password }) => {
    setLocalStorageSessionId(username, password)
  }

  return (
    <div className='registration'>
      <div className='registration-header'>
        <h1 className='registration-header__text'>Войти</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='registration__form'>
        <div className='registration-username'>
          <label className='registration-label registration-username__label'>
            <span className='registration-label__text '>Имя пользователя</span>
            <input
              className='registration-input registration-username__input'
              {...register('username', { required: 'Обяз' })}
            />
          </label>
        </div>
        <div className='registration-error'>
          {errors?.username && (
            <span className='registration-error__text'>
              {errors?.username?.message}
            </span>
          )}
        </div>
        <div className='registration-password'>
          <label className='registration-label registration-password__label'>
            <span className='registration-label__text'>Пароль</span>
            <input
              className='registration-input registration-password__input'
              {...register('password', { required: 'Обяз' })}
            />
          </label>
        </div>
        <div className='registration-error'>
          {errors?.username && (
            <span className='registration-error__text'>
              {errors?.username?.message}
            </span>
          )}
        </div>
        <div className='password-reset'>
          <button className='password-reset__button'>
            <p className='password-reset__text'>забыли пароль?</p>
          </button>
        </div>
        <div className='registration-submit'>
          <input
            type='submit'
            value='Войти'
            className={
              isValid
                ? 'registration-submit__input '
                : 'registration-submit__input registration-submit__input_invalide'
            }
            disabled={!isValid}
          />
        </div>
      </form>
    </div>
  )
}

export default Registration
