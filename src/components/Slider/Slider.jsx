import slider_arrow_left from '../../assets/img/slider-arrow-left.svg'
import slider_arrow_right from '../../assets/img/slider-arrow-right.svg'

//fix SLIDER ДОЛЖЕН БЫТЬ ОТДЕЛЬНЫМ!!!
//ОПРЕДЕЛИСЬ

const Slider = ({ classSlider, children }) => {
  return (
    <div className='slider-container'>
      <button className='slider-container__button slider-container__button_prev'>
        <img
          src={slider_arrow_left}
          alt='slider arrow'
          className='slider-container__img slider-container__img_left'
        />
      </button>
      <button className='slider-container__button slider-container__button_next'>
        <img
          src={slider_arrow_right}
          alt='slider arrow'
          className=' slider-container__img slider-container__img_right'
        />
      </button>
      <div className={classSlider}>{children}</div>
    </div>
  )
}

export default Slider
