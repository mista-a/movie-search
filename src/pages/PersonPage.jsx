import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PersonAPI } from '../API/API'

const Person = () => {
  const { id } = useParams()
  const [personDescribe, setPersonDescribe] = useState({
    profile_path:
      'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/271xabIyKpp8R0mjRRD6eZkfqjn.jpg',
  })
  const [personCredits, setPersonCredits] = useState({
    cast: [{ poster_path: '/az478qHIo2nYAzKVms0wj4efdBE.jpg' }],
  })
  useEffect(() => {
    const getPersonDescribe = async (id, language) => {
      const personDescribe = await PersonAPI.getPersonDescribe(id, language)
      setPersonDescribe(personDescribe)
    }
    const getPersonCredits = async (id, language) => {
      const personCredits = await PersonAPI.getPersonCredits(id, language)
      setPersonCredits(personCredits)
    }

    console.log(personCredits)

    getPersonCredits(id, 'Ru-ru')
    getPersonDescribe(id, 'Ru-ru')
  }, [])
  return (
    <section className='profile-page'>
      <div className='describe-inner--profile'>
        <div className='left-description'>
          <div className='left-description__movie-poster'>
            <img
              src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${personDescribe.profile_path}`}
              alt=''
              className='movie-poster__image'
            />
          </div>
        </div>
        <div className='describe'>
          <h2 className='movie-title__translated'>{personDescribe.name}</h2>
          <div className='subtitle'>
            <span className='realese-date'>{personDescribe.birthday}</span>
          </div>
          <p>{personDescribe.biography}</p>
          {personCredits.cast.map((person) => {
            return (
              <img
                src={`https://www.themoviedb.org/t/p/w150_and_h225_bestv2${person.poster_path}`}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Person