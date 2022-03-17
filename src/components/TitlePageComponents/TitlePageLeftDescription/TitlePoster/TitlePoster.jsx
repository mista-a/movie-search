import { themoviedb } from '../../../../links'

const TitlePoster = ({ posterPath }) => {
  return (
    <div className='left-description__title-poster'>
      <img
        src={`${themoviedb}/t/p/w600_and_h900_bestv2${posterPath}`}
        alt='title poster'
        className='title-poster__image'
      />
    </div>
  )
}

export default TitlePoster
