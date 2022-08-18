import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { personAPI } from '../../API/API'
import Preloader from '../../components/common/Preloader/Preloader'
// import placeholder_image_100x135 from '../../assets/img/placeholder-image-100x135.svg'
import { LanguageContext } from '../../contexts/LanguageContext'
import { themoviedb } from '../../links'
import { useMediaQuery } from 'react-responsive'
import PersonFacts from '../../components/Person/PersonFacts'
import PersonTakePart from '../../components/Person/PersonTakePart'

const Person = () => {
  const [loading, setLoading] = useState(false)
  const [personState, setPersonState] = useState({
    describe: {
      profile_path: `${themoviedb}/t/p/w600_and_h900_bestv2/271xabIyKpp8R0mjRRD6eZkfqjn.jpg`,
      biography: '',
      birthday: '',
      name: '',
      place_of_birth: '',
    },
    credits: {
      cast: [{ title: '' }],
    },
  })

  const tabletMQ = useMediaQuery({ query: '(max-width: 600px)' })

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

  return tabletMQ ? (
    <>
      <div className='person-main-information'>
        <div className='left-description__poster-about'>
          <img
            src={`${themoviedb}/t/p/w600_and_h900_bestv2${personState.describe.profile_path}`}
            alt=' '
            className='poster-about__image'
          />
        </div>
        <PersonFacts
          place_of_birth={personState.describe.place_of_birth}
          geneder={personState.describe.geneder}
          birthday={personState.describe.birthday}
          deathday={personState.describe.deathday}
        />
      </div>
      <div className='center-description'>
        <h1 className='person-name'>{personState.describe.name}</h1>
        <p className='description-about'>{personState.describe.biography}</p>
        <PersonTakePart cast={personState.credits.cast} />
      </div>
    </>
  ) : (
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
          <PersonFacts
            place_of_birth={personState.describe.place_of_birth}
            geneder={personState.describe.geneder}
            birthday={personState.describe.birthday}
            deathday={personState.describe.deathday}
          />
        </div>
        <div className='center-description'>
          <h1 className='person-name'>{personState.describe.name}</h1>
          <p className='description-about'>{personState.describe.biography}</p>
          <PersonTakePart cast={personState.credits.cast} />
        </div>
      </div>
    </div>
  )
}

export default Person
