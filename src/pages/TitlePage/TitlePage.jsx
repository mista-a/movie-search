import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { titleAPI } from '../../API/API'
import { LanguageContext } from '../../contexts/LanguageContext'
import TitlePageLeftDescription from '../../components/TitlePageComponents/TitlePageLeftDescription/TitlePageLeftDescription'
import TitlePageRightDescription from '../../components/TitlePageComponents/TitlePageRightDescription/TitlePageRightDescription'
import MainDescription from '../../components/TitlePageComponents/MainDescription/MainDescription'

//fix попробуй треллер норм выбрать (official, #1)
//fix для credits сделать context ?
//fix loaded плохо работает

const TitlePage = () => {
  const [titleState, setTitleState] = useState({
    description: {
      poster_path: '/66RvLrRJTm4J8l3uHXWF09AICol.jpg',
      genres: [],
      release_date: [],
      vote_average: 1,
    },
    credits: { cast: [], crew: [{ name: '' }] },
  })
  const [loaded, setLoaded] = useState(false)

  const { titleType, titleId } = useParams()

  const language = useContext(LanguageContext)

  useEffect(() => {
    const getTitleState = async (titleType, titleId, language) => {
      setLoaded(false)
      const description = await titleAPI.getDescription(
        titleType,
        titleId,
        language,
      )

      const credits = await titleAPI.getCredits(titleType, titleId, language)

      setTitleState({
        ...titleState,
        description,
        credits,
      })
      setLoaded(true)
    }

    getTitleState(titleType, titleId, language.language)
  }, [language])

  return (
    loaded && (
      <div className='title-page'>
        <div className='describe-inner'>
          <TitlePageLeftDescription
            posterPath={titleState.description.poster_path}
          />
          <MainDescription
            description={titleState.description}
            credits={titleState.credits}
          />
          <TitlePageRightDescription
            vote_average={titleState.description.vote_average}
            credits={titleState.credits}
          />
        </div>
      </div>
    )
  )
}

export default TitlePage
