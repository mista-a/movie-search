import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { movieAPI } from '../API/API'
import gener_partition from '../assets/img/gener-partition.png'

const MoviePage = () => {
  const { id } = useParams()
  const [movieDescription, setMovieDescription] = useState({
    poster_path: '',
    genres: [],
    release_date: [],
  })
  const [movieAgeLimit, setMovieAgeLimit] = useState({
    id: 0,
    results: [{ release_dates: [{ certification: '0' }] }],
  })
  const release_date = new Date(movieDescription.release_date)
  const monthListRus = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентабря',
    'октября',
    'ноября',
    'декабря',
  ]

  //fix сделай нормальный default state

  useEffect(() => {
    const getDescription = async (id) => {
      const movieDescription = await movieAPI.getMovieDescription(id, 'movie')
      setMovieDescription(movieDescription)
    }

    getDescription(id)
  }, [])

  useEffect(() => {
    const getMovieAgeLimit = async (id) => {
      const movieAgeLimit = await movieAPI.getMovieAgeLimit(id)
      setMovieAgeLimit(movieAgeLimit)
    }
    getMovieAgeLimit(id)
  }, [])

  console.log(movieDescription)

  return (
    <section className='movie-page'>
      <div className='movie-poster'>
        <img
          src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movieDescription.poster_path}`}
          alt='movie poster'
          className='movie-poster__image'
        />
      </div>
      <div className='description'>
        <div className='movie-title'>
          <h2 className='movie-title__translated'>{movieDescription.title}</h2>
          {movieAgeLimit !== 0 &&
            movieAgeLimit.results[0].release_dates[0].certification && (
              <div className='age-limit-container'>
                {
                  <b className='age-limit-container__text'>
                    {movieAgeLimit.results[0].release_dates[0].certification}
                  </b>
                }
              </div>
            )}
        </div>
        <div className='subtitle'>
          <span className='release-date'>{`${release_date.getDate()} ${
            monthListRus[release_date.getMonth()]
          } ${release_date.getFullYear()} г.`}</span>
          <div className='geners'>
            {movieDescription.genres.map((item, index) => (
              <b key={item.id} className='geners__name'>
                {index !== 0 && (
                  <img src={gener_partition} className='geners__partition' />
                )}
                <a href='#'>{`${item.name}`}</a>
              </b>
            ))}
          </div>
        </div>
        <p className='movie-description'>{movieDescription.overview}</p>
      </div>
      <div className='side-description'>
        <span className='rating'>{movieDescription.vote_average}</span>
      </div>
    </section>
  )
}

export default MoviePage
