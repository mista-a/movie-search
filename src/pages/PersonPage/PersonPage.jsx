import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { personAPI } from '../../API/API'
import placeholder_image_100x135 from '../../assets/img/placeholder-image-100x135.svg'
import { LanguageContext } from '../../contexts/LanguageContext'
import { themoviedb } from '../../links'

//fix уменьшить размер фотак
//fix добавить crew не забудь

const Person = () => {
  const { personId } = useParams()
  const [personState, setPersonState] = useState({
    describe: {
      profile_path: `${themoviedb}/t/p/w600_and_h900_bestv2/271xabIyKpp8R0mjRRD6eZkfqjn.jpg`,
      biography: '',
      birthday: 0,
    },
    credits: {
      poster_path: '/az478qHIo2nYAzKVms0wj4efdBE.jpg',
      cast: [{ title: '' }],
    },
  })

  const { language } = useContext(LanguageContext)

  useEffect(() => {
    const getPersonState = async (personId, language) => {
      const describe = await personAPI.getPersonDescribe(personId, language)
      const credits = await personAPI.getPersonCredits(personId, language)

      setPersonState({ ...personState, describe, credits })
    }

    getPersonState(personId, language)
  }, [language])

  return (
    <section className='person-page'>
      <div className='describe-container'>
        <div className='left-description'>
          <div className='person-poster'>
            <img
              src={`${themoviedb}/t/p/w600_and_h900_bestv2${personState.describe.profile_path}`}
              alt=''
              className='person-poster__image'
            />
          </div>
        </div>
        <div className='person-describe'>
          <h2 className='person-name'>{personState.describe.name}</h2>
          <div className='person-describe__subtitle'>
            <span className='person-lifetime'>
              {personState.describe.birthday}
            </span>
          </div>
          <p className='person-biography'>{personState.describe.biography}</p>
          <div className='titles'>
            {personState.credits.cast.map((title, index) => {
              return (
                <div className='title' key={title.credit_id}>
                  <img
                    src={
                      title.poster_path
                        ? `${themoviedb}/t/p/w150_and_h225_bestv2${title.poster_path}`
                        : placeholder_image_100x135
                    }
                    className='title__image'
                    alt='poster'
                  />
                  <div className='title__description'>
                    <p className='title__translated-name'>
                      {personState.credits.cast[index].title}
                    </p>
                    <hr className='title-delimiter title-delimiter__top ' />
                    <p className='title__original-name'>
                      {personState.credits.cast[index].original_title}
                    </p>
                    <hr className='title-delimiter title-delimiter__bottom' />
                    <p className='title__character-name'>
                      {personState.credits.cast[index].character}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Person
