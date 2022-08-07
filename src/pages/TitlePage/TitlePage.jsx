import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { titleAPI } from '../../API/API'
import { LanguageContext } from '../../contexts/LanguageContext'
import TitlePageLeftDescription from '../../components/TitlePageComponents/TitlePageLeftDescription/TitlePageLeftDescription'
import TitlePageRightDescription from '../../components/TitlePageComponents/TitlePageRightDescription/TitlePageRightDescription'
import Preloader from '../../components/common/Preloader/Preloader'
import TitlePageCenterDescription from '../../components/TitlePageComponents/MainDescription/TitlePageCenterDescription'

const TitlePage = () => {
  const [loaded, setLoaded] = useState(false)
  const [titleState, setTitleState] = useState({
    description: {
      title: '',
      genres: [],
      overview: '',
      vote_average: 1,
      release_date: [],
      poster_path: '/66RvLrRJTm4J8l3uHXWF09AICol.jpg',
    },
    credits: { cast: [], crew: [{ name: '' }] },
  })

  const { titleType, titleId } = useParams()

  const language = useContext(LanguageContext)

  useEffect(() => {
    const getTitleState = async (titleType, titleId, language) => {
      setLoaded(false)
      let credits = await titleAPI.getCredits(titleType, titleId, language)
      if (credits.length) {
        credits = await titleAPI.getCredits(titleType, titleId, 'en-Us')
      }
      let description = await titleAPI.getDescription(
        titleType,
        titleId,
        language
      )
      if (description.length) {
        description = await titleAPI.getDescription(titleType, titleId, 'en-Us')
      }
      setTitleState({
        description,
        credits,
      })
      setLoaded(true)
    }

    getTitleState(titleType, titleId, language.language)
  }, [language, titleType, titleId])

  if (!loaded) return <Preloader />

  return (
    <div className='about-page'>
      <div className='description-wrapper'>
        <TitlePageLeftDescription
          posterPath={titleState.description.poster_path}
        />
        <TitlePageCenterDescription
          credits={titleState.credits}
          name={titleState.description.title}
          genres={titleState.description.genres}
          overview={titleState.description.overview}
          releaseDate={titleState.description.release_date}
        />
        <TitlePageRightDescription
          voteAverage={titleState.description.vote_average}
          credits={titleState.credits}
        />
      </div>
    </div>
  )
}

export default TitlePage
