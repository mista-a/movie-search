import { useContext, useEffect, useState } from 'react'
import { listsAPI } from '../../../../../API/API'
import { AccountContext } from '../../../../../contexts/AccountContext'
import { AuthenticationContext } from '../../../../../contexts/AuthenticationContext'
import showOption from '../../../../../utils/showOption'

const AddToWatchList = ({ titleType, titleId }) => {
  const [showAddToWatchList, setShowAddToWatchList] = useState(false)

  const { watchList, updateWatchlist } = useContext(AccountContext)
  const { sessionId } = useContext(AuthenticationContext)

  const addToWatchList = async () => {
    await listsAPI.addToWatchList(titleType, titleId, sessionId, true)
    updateWatchlist()
  }

  useEffect(() => {
    showOption(watchList.results, titleId)
    setShowAddToWatchList(showOption(watchList.results, titleId))
  }, [watchList])

  return (
    showAddToWatchList && (
      <div className='content-option content-options__watched'>
        <button className='content-options__button' onClick={addToWatchList}>
          <span className='content-options__text'>просмотренно</span>
        </button>
      </div>
    )
  )
}

export default AddToWatchList
