import { themoviedb } from '../../../../links'

const TitlePoster = ({ posterPath }) => {
  return (
    <div className='left-description__poster-about'>
      <img
        src={`${themoviedb}/t/p/w600_and_h900_bestv2${posterPath}`}
        alt='title poster'
        className='poster-about__image'
      />
    </div>
  )
}

export default TitlePoster
