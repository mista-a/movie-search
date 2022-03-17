import { themoviedb } from '../../../../links'
import Slider from '../../../../components/common/Slider/Slider'
import placeholder_image from '../../../../assets/img/image-placeholder.png'
import { Link } from 'react-router-dom'

const TitleSlider = ({ credits }) => {
  return (
    <Slider classSlider='slider' showButtons={credits.cast.length > 5}>
      {credits.cast.map((actor, index) => {
        if (index > 9) return ''
        return (
          <Link to={`/person/${actor.id}`} key={actor.id} className='slide'>
            <div className='slide__img-container'>
              <img
                src={
                  actor.profile_path
                    ? `${themoviedb}/t/p/w138_and_h175_face/${actor.profile_path}`
                    : `${placeholder_image}`
                }
                alt='actor img'
                className='slide__img'
              />
              <div className='slide__active'></div>
            </div>
            <div className='slide__text-inner'>
              <p className='slide__actor-name'>{actor.name}</p>
              <p className='slide__character-name'>{actor.character}</p>
            </div>
          </Link>
        )
      })}
    </Slider>
  )
}

export default TitleSlider
