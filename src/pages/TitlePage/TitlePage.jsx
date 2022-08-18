import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { titleAPI } from '../../API/API'
import { LanguageContext } from '../../contexts/LanguageContext'
import TitlePageRightDescription from '../../components/TitlePageComponents/TitlePageRightDescription/TitlePageRightDescription'
import TitlePoster from '../../components/TitlePageComponents/TitlePageLeftDescription/TitlePoster/TitlePoster'
import TitleSlider from '../../components/TitlePageComponents/MainDescription/TitleSlider/TitleSlider'
import TitleName from '../../components/TitlePageComponents/TitleName/TitleName'
import Trailer from '../../components/TitlePageComponents/TitlePageLeftDescription/Trailer/Trailer'
import Preloader from '../../components/common/Preloader/Preloader'
import { useMediaQuery } from 'react-responsive'

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
  const ratingMQ = useMediaQuery({ query: '(max-width: 1338px)' })
  const leftSideMQ = useMediaQuery({ query: '(max-width: 660px)' })

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

  if (leftSideMQ)
    return (
      <div className='about-page'>
        <div className='center-description'>
          <TitleName
            name={titleState.description.title}
            releaseDate={titleState.description.release_date}
            genres={titleState.description.genres}
          />
          <p className='description-about'>{titleState.description.overview}</p>
          {titleState.credits.crew.length && (
            <TitleSlider credits={titleState.credits} />
          )}
        </div>
        <div className='description-wrapper'>
          <div className='left-description'>
            <TitlePoster posterPath={titleState.description.poster_path} />
            <Trailer />
          </div>
          <TitlePageRightDescription
            voteAverage={titleState.description.vote_average}
            credits={titleState.credits}
          />
        </div>
      </div>
    )

  return (
    <div className='about-page'>
      <div className='description-wrapper'>
        <div className='left-description'>
          {ratingMQ && (
            <TitlePageRightDescription
              voteAverage={titleState.description.vote_average}
              credits={titleState.credits}
            />
          )}
          <TitlePoster posterPath={titleState.description.poster_path} />
          <Trailer />
        </div>
        <div className='center-description'>
          <TitleName
            name={titleState.description.title}
            releaseDate={titleState.description.release_date}
            genres={titleState.description.genres}
          />
          <p className='description-about'>{titleState.description.overview}</p>
          {titleState.credits.crew.length && (
            <TitleSlider credits={titleState.credits} />
          )}
        </div>
        {!ratingMQ && (
          <TitlePageRightDescription
            voteAverage={titleState.description.vote_average}
            credits={titleState.credits}
          />
        )}
      </div>
    </div>
  )
}

export default TitlePage
