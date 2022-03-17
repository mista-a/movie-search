import TitleName from '../../../components/TitlePageComponents/TitleName/TitleName'
import TitleSlider from './TitleSlider/TitleSlider'

const MainDescription = ({ description, credits }) => {
  return (
    <div className='description'>
      <TitleName
        name={description.title}
        releaseDate={description.release_date}
        genres={description.genres}
      />
      <p className='title-description'>{description.overview}</p>
      {credits.crew.length && <TitleSlider credits={credits} />}
    </div>
  )
}

export default MainDescription
