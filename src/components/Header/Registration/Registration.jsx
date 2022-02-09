import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { AuthenticationContext } from '../../../contexts/AuthenticationContext'

const Registration = () => {
  const { setLocalStorageSessionId } = useContext(AuthenticationContext)

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'onBlur' })

  const getAuth = async () => {
    // window.open(
    //   `https://www.themoviedb.org/authenticate/${newToken.request_token}?redirect_to=http://localhost:3000/profile`,
    // )
    // authenticationAPI.createNewSession(searchParams.get('request_token'))
  }

  const onSubmit = async ({ username, password }) => {
    setLocalStorageSessionId(username, password)
  }

  return (
    <div className='registration'>
      <form onSubmit={handleSubmit(onSubmit)} className='registration__form'>
        <label className='registration__label'>
          <input
            className='registration__input'
            {...register('username', { required: 'Обяз' })}
          />
        </label>
        <div className='registration__error'>
          {errors?.username && <p>{errors?.username?.message}</p>}
        </div>
        <label className='registration__label'>
          <input
            className='registration__input'
            {...register('password', { required: 'Обяз' })}
          />
        </label>
        <div className='registration__error'>
          {errors?.username && <p>{errors?.username?.message}</p>}
        </div>
        <input
          type='submit'
          className='registration__submit'
          disabled={!isValid}
        />
      </form>
    </div>
  )
}

export default Registration
