import { useContext } from 'react'
import { listsAPI } from '../../../../API/API'
import { AuthenticationContext } from '../../../../contexts/AuthenticationContext'

const AddToWatchList = ({ titleType, titleId }) => {
  const { sessionId } = useContext(AuthenticationContext)

  const addToWatchList = async () => {
    await listsAPI.addToWatchList(titleType, titleId, sessionId, true)
  }

  return (
    <div className='content-option content-options__watched'>
      <button
        className='content-options__button'
        onClick={() => addToWatchList()}
      >
        <span className='content-options__text'>просмотренно</span>
      </button>
    </div>
  )
}

export default AddToWatchList
