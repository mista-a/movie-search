import TitleName from '../TitleName/TitleName'
import TitleSlider from './TitleSlider/TitleSlider'

const TitlePageCenterDescription = ({
  name,
  releaseDate,
  genres,
  overview,
  credits,
}) => {
  return (
    <div className='center-description'>
      <TitleName name={name} releaseDate={releaseDate} genres={genres} />
      <p className='description-about'>{overview}</p>
      {credits.crew.length && <TitleSlider credits={credits} />}
    </div>
  )
}

export default TitlePageCenterDescription
