import { useEffect, useRef, useState } from 'react'
import slider_arrow_left from '../../assets/img/slider-arrow-left.svg'
import slider_arrow_right from '../../assets/img/slider-arrow-right.svg'

//fix SLIDER ДОЛЖЕН БЫТЬ ОТДЕЛЬНЫМ!!!

const Slider = ({ classSlider, children, showButtons }) => {
  const sliderRef = useRef()
  const [left, setLeft] = useState(0)
  const [leftButton, setLeftButton] = useState(false)
  const [leftButtonAnim, setLeftButtonAnim] = useState(false)
  const [rightButton, setRightButton] = useState(true)
  const [rightButtonAnim, setRightButtonAnim] = useState(true)

  useEffect(() => {
    if (left > 0) {
      setLeftButtonAnim(true)
      setLeftButton(true)
    } else {
      setLeftButtonAnim(false)
      setTimeout(() => setLeftButton(false), 400)
    }
  }, [left])

  useEffect(() => {
    if (left <= 0) {
      setRightButtonAnim(true)
      setRightButton(true)
    } else {
      setRightButtonAnim(false)
      setTimeout(() => setRightButton(false), 400)
    }
  }, [left])

  const slideLeft = (e) => {
    e.preventDefault()
    sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth
    setLeft((sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth))
  }

  const slideRight = (e) => {
    e.preventDefault()
    sliderRef.current.scrollLeft += sliderRef.current.offsetWidth
    setLeft((sliderRef.current.scrollLeft += sliderRef.current.offsetWidth))
  }

  return (
    <div className='slider-container'>
      {showButtons && (
        <>
          {leftButton && (
            <button
              className={
                leftButtonAnim
                  ? 'slider-container__button slider-container__button_prev'
                  : 'slider-container__button slider-container__button_prev slider-container__button_hide'
              }
              onClick={(e) => slideLeft(e)}
            >
              <img
                src={slider_arrow_left}
                alt='slider arrow'
                className='slider-container__img slider-container__img_left'
              />
            </button>
          )}
          {rightButton && (
            <button
              className={
                rightButtonAnim
                  ? 'slider-container__button slider-container__button_next'
                  : 'slider-container__button slider-container__button_next slider-container__button_hide'
              }
              onClick={(e) => slideRight(e)}
            >
              <img
                src={slider_arrow_right}
                alt='slider arrow'
                className=' slider-container__img slider-container__img_right'
              />
            </button>
          )}
        </>
      )}
      <div className=''></div>
      <div className={classSlider} ref={sliderRef}>
        {children}
      </div>
    </div>
  )
}

export default Slider
