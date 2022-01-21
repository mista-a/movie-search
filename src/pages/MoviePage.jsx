import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { movieAPI } from '../API/API'
import gener_partition from '../assets/img/gener-partition.png'
import enable_rating_star from '../assets/img/enable-rating-star.png'
import disable_rating_star from '../assets/img/disable-rating-star.svg'

const MoviePage = () => {
  const { id } = useParams()
  const [movieDescription, setMovieDescription] = useState({
    poster_path: '/66RvLrRJTm4J8l3uHXWF09AICol.jpg',
    genres: [],
    release_date: [],
    vote_average: 1,
  })
  const [movieAgeLimit, setMovieAgeLimit] = useState({
    id: 0,
    results: [{ release_dates: [{ certification: '0' }] }],
  })
  const [movieCredits, setMovieCredits] = useState({
    casts: [],
    crew: [{ name: '' }],
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

  const getDirector = () => {
    let ind = 0
    movieCredits.crew.forEach((e, index) => {
      if (e.job === 'Director') ind = index
    })
    return movieCredits.crew[ind].name
  }

  //fix сделай нормальный default state
  //доделать звездочки

  useEffect(() => {
    const getDescription = async (id) => {
      const movieDescription = await movieAPI.getDescription('movie', id)
      setMovieDescription(movieDescription)
    }

    const getMovieAgeLimit = async (id) => {
      const movieAgeLimit = await movieAPI.getMovieAgeLimit(id)
      setMovieAgeLimit(movieAgeLimit)
    }

    const getMovieCredits = async (id) => {
      const movieCredits = await movieAPI.getCredits('movie', id)
      setMovieCredits(movieCredits)
    }

    getDescription(id)
    getMovieAgeLimit(id)
    getMovieCredits(id)
  }, [])

  const showStarsRating = (starsCounter) => {
    const enableStarsCounter = Math.floor(starsCounter / 2)
    return (
      <div className='star-rating'>
        {[...Array(enableStarsCounter)].map((star, index) => {
          return (
            <img
              key={index}
              src={enable_rating_star}
              className='star-rating__enable-star'
            />
          )
        })}
        {[...Array(5 - enableStarsCounter)].map((star, index) => {
          return (
            <img
              key={index}
              src={disable_rating_star}
              className='star-rating__disable-star'
            />
          )
        })}
      </div>
    )
  }

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
        <div className='rating'>
          <span className='rating__rating-mark'>
            {movieDescription.vote_average}
          </span>
          <span className='rating__max-rating'>/10</span>
          {showStarsRating(movieDescription.vote_average)}
        </div>
        <div className='site-description__director'>
          <p className='director'>Режиссер</p>
          <p className='director__name'>{getDirector()}</p>
        </div>
      </div>
    </section>
  )
}

export default MoviePage
