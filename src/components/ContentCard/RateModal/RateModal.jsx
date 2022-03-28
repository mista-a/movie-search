import { useState, useRef, useContext } from 'react'
import { listsAPI, titleAPI } from '../../../API/API'
import { AuthenticationContext } from '../../../contexts/AuthenticationContext'
import Modal from '../../common/Modal/Modal'

const RateModal = ({ rateModal, setRateModal, titleType, titleId }) => {
  const [rate, setRate] = useState(0)

  const { sessionId } = useContext(AuthenticationContext)

  const rates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const changeRate = (e) => setRate(e.target.value)

  const onRateSubmit = (e) => {
    e.preventDefault()
    rate !== 0
      ? titleAPI.postRating(titleType, titleId, rate, sessionId)
      : listsAPI.addToWatchList(titleType, titleId, sessionId)
  }

  return (
    <Modal active={rateModal} setActive={setRateModal}>
      <div className='rate-bar'>
        <form onSubmit={onRateSubmit}>
          <label className='rate-bar__label'>
            <input
              className='rate-bar__input'
              type='radio'
              name='rate'
              value={0}
              defaultChecked
              onChange={changeRate}
            />
            <div className='rate-button'>X</div>
          </label>
          {rates.map((rate, index) => (
            <label className='rate-bar__label' key={index}>
              <input
                className='rate-bar__input'
                type='radio'
                name='rate'
                value={rate}
                onChange={changeRate}
              />
              <div className='rate-button'>{rate}</div>
            </label>
          ))}
          <div className='rate-bar-submit'>
            <input className='rate-bar-submit__input' type='submit' />
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default RateModal
