import TitlePoster from './TitlePoster/TitlePoster'
import Trailer from './Trailer/Trailer'

//fix loaded не робе

const TitlePageLeftDescription = ({ posterPath }) => {
  // const [loaded, setLoaded] = useState(false)

  return (
    // loaded && (
    <div className='left-description'>
      <TitlePoster posterPath={posterPath} />
      <Trailer />
    </div>
  )
}

export default TitlePageLeftDescription
