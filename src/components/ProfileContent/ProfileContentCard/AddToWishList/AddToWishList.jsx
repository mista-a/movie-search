import { useContext } from 'react'
import { listsAPI } from '../../../../API/API'
import { AuthenticationContext } from '../../../../contexts/AuthenticationContext'

const AddToWishList = ({ titleType, titleId }) => {
  const { sessionId } = useContext(AuthenticationContext)

  const addToWishList = async () => {
    await listsAPI.addToWishList(titleType, titleId, sessionId, true)
  }

  return (
    <div className='content-option content-options__watch'>
      <button className='content-options__button' onClick={() => addToWishList}>
        <span className='content-options__text'>посмотрю</span>
      </button>
    </div>
  )
}

export default AddToWishList
