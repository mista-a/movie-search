import { useState } from 'react'

const RateTitle = ({ showRateModal }) => {
  return (
    <div className='content-option content-options__rate'>
      <button className='content-options__button' onClick={showRateModal}>
        <span className='content-options__text'>оценить</span>
      </button>
    </div>
  )
}

export default RateTitle
