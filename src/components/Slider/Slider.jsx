import { useRef } from 'react'
import slider_arrow_left from '../../assets/img/slider-arrow-left.svg'
import slider_arrow_right from '../../assets/img/slider-arrow-right.svg'

//fix SLIDER ДОЛЖЕН БЫТЬ ОТДЕЛЬНЫМ!!!
//ОПРЕДЕЛИСЬ

const Slider = ({ classSlider, children }) => {
  const sliderRef = useRef()

  const slideRight = (e) => {
    e.preventDefault()
    sliderRef.current.scrollLeft += sliderRef.current.offsetWidth
  }

  const slideLeft = (e) => {
    e.preventDefault()
    sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth
  }

  return (
    <div className='slider-container'>
      <button
        className='slider-container__button slider-container__button_prev'
        onClick={(e) => {
          slideLeft(e)
        }}
      >
        <img
          src={slider_arrow_left}
          alt='slider arrow'
          className='slider-container__img slider-container__img_left'
        />
      </button>
      <button
        className='slider-container__button slider-container__button_next'
        onClick={(e) => {
          slideRight(e)
        }}
      >
        <img
          src={slider_arrow_right}
          alt='slider arrow'
          className=' slider-container__img slider-container__img_right'
        />
      </button>
      <div className={classSlider} ref={sliderRef}>
        {children}
      </div>
    </div>
  )
}

export default Slider
