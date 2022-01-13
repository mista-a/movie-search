import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { moviePage } from '../API/API'

const MoviePage = () => {
  const { id } = useParams()
  const [movieDescribe, setMovieDescribe] = useState({ poster_path: '' })
  const [movieAgeLimit, setMovieAgeLimit] = useState(0)
  const monthListRus = [
    'января',
    'февраля',
    'мара',
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
  const release_date = new Date(movieDescribe.release_date)

  useEffect(() => {
    const getDescribe = async (id) => {
      const movieDescribe = await moviePage.getMovieDescribe(id)
      setMovieDescribe(movieDescribe)
    }

    getDescribe(id)
  }, [])

  useEffect(() => {
    if (movieAgeLimit !== 0) {
      const getMovieAgeLimit = async (id) => {
        const movieAgeLimit = await moviePage.getMovieAgeLimit(id)
        setMovieAgeLimit(movieAgeLimit)
      }
      getMovieAgeLimit(id)
    }
  }, [])

  return (
    <section className='movie-page'>
      <div className='movie-poster'>
        <img
          src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movieDescribe.poster_path}`}
          alt='movie poster'
          className='movie-poster__image'
        />
      </div>
      <div className='main-description'>
        <span className='movie-title'>
          <h2 className='movie-title__translated'>{movieDescribe.title}</h2>
          <h3 className='movie-title__original'>{` / ${movieDescribe.original_title}`}</h3>
        </span>
        <span className='movie-name__description'>
          <span className='release-date'>{`${release_date.getDay()} ${
            monthListRus[release_date.getMonth()]
          } ${release_date.getFullYear()} г.`}</span>
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
          <span className='geners'>
            <b className='gener-name 1'>{`приключение .`}</b>
            <b className='gener-name 2'>комедия &#8226</b>
            <b className='gener-name 3'>боевик</b>
          </span>
        </span>
      </div>
    </section>
  )
}

export default MoviePage
