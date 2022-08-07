import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { personAPI } from '../../API/API'
import Preloader from '../../components/common/Preloader/Preloader'
// import placeholder_image_100x135 from '../../assets/img/placeholder-image-100x135.svg'
import { LanguageContext } from '../../contexts/LanguageContext'
import { themoviedb } from '../../links'

const Person = () => {
  const [loading, setLoading] = useState(false)
  const [personState, setPersonState] = useState({
    describe: {
      profile_path: `${themoviedb}/t/p/w600_and_h900_bestv2/271xabIyKpp8R0mjRRD6eZkfqjn.jpg`,
      biography: '',
      birthday: '',
      name: '',
    },
    credits: {
      cast: [{ title: '' }],
    },
  })

  const { language } = useContext(LanguageContext)
  const { personId } = useParams()

  useEffect(() => {
    const getPersonState = async (personId, language) => {
      setLoading(true)
      let credits = await personAPI.getPersonCredits(personId, language)
      let describe = await personAPI.getPersonDescribe(personId, language)
      if (!describe.biography.length) {
        describe = await personAPI.getPersonDescribe(personId, 'en-Us')
      }
      setPersonState((personState) => ({ ...personState, describe, credits }))
      setLoading(false)
    }

    getPersonState(personId, language)
  }, [language, personId])

  if (loading) return <Preloader />

  return (
    <div className='about-page'>
      <div className='description-wrapper'>
        <div className='left-description'>
          <div className='left-description__poster-about'>
            <img
              src={`${themoviedb}/t/p/w600_and_h900_bestv2${personState.describe.profile_path}`}
              alt=' '
              className='poster-about__image'
            />
          </div>
        </div>
        <div className='center-description'>
          <h1 className='person-name'>{personState.describe.name}</h1>
          <div className='person-describe__subtitle'>
            <span className='person-lifetime'>
              {personState.describe.birthday?.split('-').join('.')}
            </span>
          </div>
          <div>
            <h2>Биография</h2>
            <p className='description-about'>
              {personState.describe.biography}
            </p>
          </div>
          <div className='person-take-part'>
            <h2 className='person-take-part__text'>Принимал участие в</h2>
            <div className='person-titles'>
              {personState.credits.cast.map(
                ({
                  id,
                  character,
                  title,
                  vote_average,
                  vote_count,
                  release_date,
                  media_type,
                }) =>
                  title &&
                  character && (
                    <Link
                      className='person-title'
                      to={`/${media_type}/${id}`}
                      key={id}
                    >
                      <div className='title-header'>
                        <span className='title-header__name'>{title}</span>
                        <span className='title-header__date'>
                          {release_date?.slice(0, 4)}
                        </span>
                      </div>
                      <div className='title-subheader'>
                        <span className='title-subheader__character'>
                          {character}
                        </span>
                        <div className='title-subheader__rating'>
                          <span className='title-subheader__rating-mark'>
                            {vote_average?.toFixed(1)}
                          </span>
                          <span className='title-subheader__rating-vote'>
                            {vote_count}
                          </span>
                        </div>
                      </div>
                    </Link>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Person
