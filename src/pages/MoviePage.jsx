import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { movieAPI } from '../API/API'
import gener_partition from '../assets/img/gener-partition.png'
import enable_rating_star from '../assets/img/enable-rating-star.png'
import disable_rating_star from '../assets/img/disable-rating-star.svg'
import Slider from '../components/Slider/Slider'
import placeholder_image from '../assets/img/image-placeholder.png'
import play_image from '../assets/img/play-image.svg'
import Modal from '../components/Modal/Modal'
import { LanguageContext } from '../contexts/LanguageContext'

const MoviePage = () => {
  //fix доделать звездочки
  //fix подумай над реализацией отсутсвия треллера
  //fix попробуй треллер норм выбрать (official, #1)
  //fix переделать месяцы
  const [movieState, setMovieState] = useState({
    description: {
      poster_path: '/66RvLrRJTm4J8l3uHXWF09AICol.jpg',
      genres: [],
      release_date: [],
      vote_average: 1,
    },
    ageLimit: {
      id: 0,
      results: [{ release_dates: [{ certification: '0' }] }],
    },
    credits: { cast: [], crew: [{ name: '' }] },
    trailer: { results: [{ key: 'VCMaJLwChfs' }] },
  })
  const [loading, setLoading] = useState(true)
  const [sliderModalActive, setSliderModalActive] = useState(false)

  const { id } = useParams()

  const language = useContext(LanguageContext)

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

  const toggleSliderModalActive = () => setSliderModalActive(!sliderModalActive)

  useEffect(() => {
    const getMovieState = async (id, language) => {
      setLoading(true)
      const description = await movieAPI.getDescription('movie', id, language)
      const ageLimit = await movieAPI.getMovieAgeLimit(id)
      const credits = await movieAPI.getCredits('movie', id, language)
      const trailer = await movieAPI.getTrailer('movie', id, language)
      setMovieState({
        ...movieState,
        description,
        ageLimit,
        credits,
        trailer,
      })
      setLoading(false)
    }
    getMovieState(id, language.language)
  }, [language])

  const getDirector = () => {
    if (movieState.credits.crew.length) {
      let ind = 0
      movieState.credits.crew.forEach((person, index) => {
        if (person.job === 'Director') ind = index
      })
      return movieState.credits.crew[ind].name
    }
  }

  const showStarsRating = (starsCounter) => {
    const enableStarsCounter = Math.floor(starsCounter / 2)
    return (
      <div className='star-rating'>
        {[...Array(enableStarsCounter)].map((star, index) => {
          return (
            <img
              className='star-rating__enable-star'
              key={index}
              src={enable_rating_star}
              alt='enable star'
            />
          )
        })}
        {[...Array(5 - enableStarsCounter)].map((star, index) => {
          return (
            <img
              className='star-rating__disable-star'
              key={index}
              src={disable_rating_star}
              alt='disable star'
            />
          )
        })}
      </div>
    )
  }

  if (!loading) {
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
              className={
                movieState.trailer.results.length
                  ? 'trailer-button'
                  : 'trailer-button--disabled'
              }
              onClick={toggleSliderModalActive}
            >
              <img
                src={play_image}
                alt='play image'
                className='trailer-button__play-image'
              />
              <span className='trailer-button__text'>Смотреть трейллер</span>
            </button>
            {movieState.trailer.results.length ? (
              <Modal
                active={sliderModalActive}
                setActive={setSliderModalActive}
              >
                <iframe
                  width='1200'
                  height='675'
                  src={`https://www.youtube.com/embed/${movieState.trailer.results[0].key}?&autoplay=1`}
                  title='YouTube video player'
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
              </Modal>
            ) : (
              ''
            )}
            <p className='trailer-button-subscribe'>
              *трейлер может отсутствовать :(
            </p>
          </div>
          <div className='description'>
            <div className='movie-title'>
              <h2 className='movie-title__translated'>
                {movieState.description.title}
              </h2>
              {movieState.ageLimit !== 0 &&
                movieState.ageLimit.results[0].release_dates[0]
                  .certification && (
                  <div className='age-limit-container'>
                    {
                      <b className='age-limit-container__text'>
                        {
                          movieState.ageLimit.results[0].release_dates[0]
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
                      <img
                        src={gener_partition}
                        className='geners__partition'
                        alt=' '
                      />
                    )}
                    <span>{`${item.name}`}</span>
                  </b>
                ))}
              </div>
            </div>
            <p className='movie-description'>
              {movieState.description.overview}
            </p>
            {movieState.credits.crew.length ? (
              <Slider
                classSlider='slider'
                showButtons={movieState.credits.cast.length > 5}
              >
                {movieState.credits.cast.map((actor, index) => {
                  if (index > 9) return ''
                  return (
                    <Link
                      to={`/person/${actor.id}`}
                      key={actor.id}
                      className='slide'
                    >
                      <div className='slide__img-container'>
                        <img
                          src={
                            actor.profile_path
                              ? `https://www.themoviedb.org/t/p/w138_and_h175_face/${actor.profile_path}`
                              : `${placeholder_image}`
                          }
                          alt='actor img'
                          className='slide__img'
                        />
                        <div className='slide__active'></div>
                      </div>
                      <div className='slide__text-inner'>
                        <p className='slide__actor-name'>{actor.name}</p>
                        <p className='slide__character-name'>
                          {actor.character}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </Slider>
            ) : (
              ''
            )}
          </div>
          <div className='right-description'>
            <div className='rating'>
              <span className='rating__rating-mark'>
                {movieState.description.vote_average}
              </span>
              <span className='rating__max-rating'>/10</span>
              {showStarsRating(movieState.description.vote_average)}
            </div>
            <div className='right-description__director'>
              <p className='director'>Режиссер</p>
              <p className='director__name'>{getDirector()}</p>
            </div>
          </div>
        </div>
      </section>
    )
  } else {
    return <></>
  }
}

export default MoviePage
