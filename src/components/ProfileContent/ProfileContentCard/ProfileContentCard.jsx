import image_placeholder from '../../../assets/img/image-placeholder.png'
import { forwardRef, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import cutText from '../../../utils/cutText'
import translateDate from '../../../utils/translateDate'
import { GenersContext } from '../../../contexts/GenersContext'
import content_options from '../../../assets/img/content-options.svg'
import { AuthenticationContext } from '../../../contexts/AuthenticationContext'
import { AccountContext } from '../../../contexts/AccountContext'
import { listsAPI } from '../../../API/API'

//fix переделать дату в описании
//fix переделать пустой жанр
//fix сделать анимацию на исчезновения description
//fix везде id заменить на  movie id

const ProfileContentCard = forwardRef(
  (
    { id, poster, type, name, overview, releaseDate, genersIds, rating },
    ref,
  ) => {
    const [loaded, setLoaded] = useState(false)
    const [showDescription, setShowDescription] = useState(false)
    const [showOptions, setShowOptions] = useState(false)
    const [watchList, setWatchList] = useState()

    const switchShowDescription = () => setShowDescription(!showDescription)

    const switchShowOptions = () => setShowOptions(!showOptions)

    const { genersList } = useContext(GenersContext)
    const { sessionId } = useContext(AuthenticationContext)
    const { accountDetails } = useContext(AccountContext)

    if (overview) overview = cutText(overview, 20)

    if (releaseDate) releaseDate = translateDate(releaseDate)

    const addToWishList = () => {}

    const addToWatchList = async () => {
      console.log('1')
      await listsAPI.addToWatchList(type, id, sessionId, true)
    }

    useEffect(() => {
      const getWatchList = async () => {
        const watchList = await listsAPI.getWatchList(
          accountDetails.id,
          sessionId,
          'ru-RU',
          1,
        )
        setWatchList(watchList)
      }
      getWatchList()
    }, [])

    console.log(watchList)

    const getGeners = (genersList, genersIds) => {
      let geners = []

      genersIds.forEach((generId) => {
        genersList.genres.forEach((gener) => {
          if (gener.id === generId) {
            geners.push(gener.name)
          }
        })
      })

      return geners
    }

    let geners = []

    if (genersIds) {
      geners = getGeners(genersList, genersIds)
    }

    return (
      <div className='content__wrapper'>
        <div className='content-card'>
          <Link to={`/${type}/${id}`}>
            <img
              className={
                loaded
                  ? 'content__card content__card_show'
                  : 'content__card content__card_hide'
              }
              ref={ref ? ref : null}
              onLoad={() => setLoaded(true)}
              onMouseEnter={switchShowDescription}
              onMouseLeave={switchShowDescription}
              src={`https://www.themoviedb.org/t/p/w185_and_h278_multi_faces${poster}`}
              alt='card'
            />
            {!loaded && (
              <img
                className={'content__card content__card_show'}
                src={image_placeholder}
                alt='card'
              />
            )}
          </Link>
          <div className='content-options'>
            <button
              className='content-options__button'
              onClick={switchShowOptions}
            >
              <img
                src={content_options}
                alt='добавить'
                className='content-options__img'
              />
            </button>
            <div
              className={
                showOptions
                  ? 'content-options__options content-options__options_show'
                  : 'content-options__options '
              }
            >
              <div className='content-options__watched'>
                <button
                  className='content-options__button'
                  onClick={() => addToWatchList()}
                >
                  <span className='content-options__text'>просмотренно</span>
                </button>
              </div>
              <div className='content-options__watch'>
                <button
                  className='content-options__button'
                  onClick={() => addToWishList}
                >
                  <span className='content-options__text'>посмотрю</span>
                </button>
              </div>
              <div className='content-options__rate'>
                <button className='content-options__button'>
                  <span className='content-options__text'>оценить</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            showDescription
              ? 'content-description content-description_show'
              : 'content-description'
          }
        >
          <div className='content-description__arrow'></div>
          <div className='content-description__description'>
            <h4 className='content-description__name'>{name}</h4>
            <p className='content-description__release-date'>
              {releaseDate} г.
            </p>
            <p className='content-description__overview'>{overview}</p>
            {geners.length ? (
              <div className='content-description__geners'>
                {`Жанры: `}
                {geners.map((gener, index) => (
                  <span className='content-description__gener' key={index}>
                    {`${gener} `}
                  </span>
                ))}
              </div>
            ) : (
              <></>
            )}
            <div className='content-description-rating content-description__rating'>
              {`Оценка: `}
              <span className='content-description-rating__text'>{rating}</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
)

export default ProfileContentCard
