import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { movieAPI } from '../API/API'
import gener_partition from '../assets/img/gener-partition.png'
import enable_rating_star from '../assets/img/enable-rating-star.png'
import disable_rating_star from '../assets/img/disable-rating-star.svg'
import Slider from '../components/Slider/Slider'
import image__placeholder from '../assets/img/image-placeholder.png'
import play_image from '../assets/img/play-image.svg'
import Modal from '../components/Modal/Modal'

const MoviePage = () => {
  const { id } = useParams()
  const [modalActive, setModalActive] = useState(false)
  const [movieState, setMovieState] = useState({
    description: {
      poster_path: '/66RvLrRJTm4J8l3uHXWF09AICol.jpg',
      genres: [],
      release_date: [],
      vote_average: 1,
    },
    AgeLimit: {
      id: 0,
      results: [{ release_dates: [{ certification: '0' }] }],
    },
    Credits: { cast: [], crew: [{ name: '' }] },
    Trailer: { results: [{ key: 'VCMaJLwChfs' }] },
  })
  const release_date = new Date(movieState.description.release_date)
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
    movieState.Credits.crew.forEach((e, index) => {
      if (e.job === 'Director') ind = index
    })
    return movieState.Credits.crew[ind].name
  }
  //const [loading, setLoading] = useState(true)

  //fix сделай нормальный default state
  //доделать звездочки

  // useEffect(() => {
  //   const getDescription = async (id) => {
  //     const description = await movieAPI.getDescription('movie', id)
  //     setMovieState({ ...movieState, description })
  //   }

  //   const getAgeLimit = async (id) => {
  //     const AgeLimit = await movieAPI.getMovieAgeLimit(id)
  //     setMovieState({ ...movieState, AgeLimit })
  //   }

  //   const getMovieCredits = async (id) => {
  //     const movieCredits = await movieAPI.getCredits('movie', id)
  //     setMovieState({ ...movieState, movieCredits })
  //     console.log(movieState)
  //   }

  //   const getMovieTraler = async (id, language) => {
  //     const movieTrailer = await movieAPI.getTrailer('movie', id, language)
  //     setMovieState({ ...movieState, movieTrailer })
  //   }

  //   setLoading(true)
  //   getDescription(id)
  //   getAgeLimit(id)
  //   getMovieCredits(id)
  //   getMovieTraler(id, 'ru-Ru')
  //   setLoading(false)
  // }, [])

  console.log(movieState)

  useEffect(() => {
    const getMovieState = async (id) => {
      const description = await movieAPI.getDescription('movie', id)
      const AgeLimit = await movieAPI.getMovieAgeLimit(id)
      const Credits = await movieAPI.getCredits('movie', id)
      const Trailer = await movieAPI.getTrailer('movie', id)

      setMovieState({
        ...movieState,
        description,
        AgeLimit,
        Credits,
        Trailer,
      })
    }

    getMovieState(id)
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
      <div className='describe-inner'>
        <div className='left-description'>
          <div className='left-description__movie-poster'>
            <img
              src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movieState.description.poster_path}`}
              alt='movie poster'
              className='movie-poster__image'
            />
          </div>
          <button
            className='trailer-button'
            onClick={() => setModalActive(true)}
          >
            <img
              src={play_image}
              alt='play image'
              className='trailer-button__play-image'
            />
            <span className='trailer-button__text'>Смотреть трейллер</span>
          </button>
          <Modal active={modalActive} setActive={setModalActive}>
            <iframe
              width='560'
              height='315'
              src={`https://www.youtube.com/embed/${movieState.Trailer.results[0].key}`}
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          </Modal>
          <p className='trailer-button-subscribe'>
            *трейлер может отсутствовать :(
          </p>
        </div>
        <div className='description'>
          <div className='movie-title'>
            <h2 className='movie-title__translated'>
              {movieState.description.title}
            </h2>
            {movieState.AgeLimit !== 0 &&
              movieState.AgeLimit.results[0].release_dates[0].certification && (
                <div className='age-limit-container'>
                  {
                    <b className='age-limit-container__text'>
                      {
                        movieState.AgeLimit.results[0].release_dates[0]
                          .certification
                      }
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
              {movieState.description.genres.map((item, index) => (
                <b key={item.id} className='geners__name'>
                  {index !== 0 && (
                    <img src={gener_partition} className='geners__partition' />
                  )}
                  <span>{`${item.name}`}</span>
                </b>
              ))}
            </div>
          </div>
          <p className='movie-description'>{movieState.description.overview}</p>
          <Slider classSlider='slider'>
            {movieState.Credits.cast.map((actor, index) => {
              if (index > 6) return ''
              return (
                <Link
                  to={`/person/${actor.id}`}
                  key={actor.id}
                  className='slide'
                >
                  <img
                    src={
                      actor.profile_path
                        ? `https://www.themoviedb.org/t/p/w138_and_h175_face/${actor.profile_path}`
                        : `${image__placeholder}`
                    }
                    alt='actor img'
                    className='slide__img'
                  />
                  <div className='slide__text-inner'>
                    <p className='slide__actor-name'>{actor.name}</p>
                    <p className='slide__character-name'>{actor.character}</p>
                  </div>
                </Link>
              )
            })}
          </Slider>
        </div>
        <div className='side-description'>
          <div className='rating'>
            <span className='rating__rating-mark'>
              {movieState.description.vote_average}
            </span>
            <span className='rating__max-rating'>/10</span>
            {showStarsRating(movieState.description.vote_average)}
          </div>
          <div className='site-description__director'>
            <p className='director'>Режиссер</p>
            <p className='director__name'>{getDirector()}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MoviePage
