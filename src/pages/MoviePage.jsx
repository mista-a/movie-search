import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { moviePage } from '../API/API'
import gener_partition from '../assets/img/gener-partition.png'

const MoviePage = () => {
  const { type, id } = useParams()
  const [movieDescribe, setMovieDescribe] = useState({
    poster_path: '',
    genres: [],
  })
  const [movieAgeLimit, setMovieAgeLimit] = useState(0)
  const release_date = new Date(movieDescribe.release_date)
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

  console.log(movieDescribe)

  useEffect(() => {
    const getDescribe = async (type, id) => {
      const movieDescribe = await moviePage.getMovieDescribe(type, id)
      if (type === 'tv') {
        movieDescribe.title = movieDescribe.name
        movieDescribe.original_title = movieDescribe.original_name
        movieDescribe.release_date = movieDescribe.first_air_date
      }
      setMovieDescribe(movieDescribe)
    }

    getDescribe(type, id)
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
        <div className='movie-title'>
          <h2 className='movie-title__translated'>{movieDescribe.title}</h2>
          <h2 className='movie-title__original'>{` / ${movieDescribe.original_title}`}</h2>
        </div>
        <div className='subtitle'>
          <span className='release-date'>{`${release_date.getDate()} ${
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
          <div className='geners'>
            {movieDescribe.genres.map((item) => (
              <b className='geners__name'>
                {`${item.name} `}
                <img src={gener_partition} className='geners__partition'></img>
              </b>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MoviePage
