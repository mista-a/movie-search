import TitlePoster from './TitlePoster/TitlePoster'
import Trailer from './Trailer/Trailer'

const TitlePageLeftDescription = ({ posterPath }) => {
  return (
    <div className='left-description'>
      <TitlePoster posterPath={posterPath} />
      <Trailer />
    </div>
  )
}

export default TitlePageLeftDescription
