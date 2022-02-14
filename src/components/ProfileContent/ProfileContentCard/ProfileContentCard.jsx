import image_placeholder from '../../../assets/img/image-placeholder.png'
import { forwardRef, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import cutText from '../../../utils/cutText'
import translateDate from '../../../utils/translateDate'
import { GenersContext } from '../../../contexts/GenersContext'

const ProfileContentCard = forwardRef(
  ({ id, poster, type, name, overview, releaseDate, genersIds }, ref) => {
    const [loaded, setLoaded] = useState(false)
    const [showDescription, setShowDescription] = useState(false)

    const switchShowDescription = () => setShowDescription(!showDescription)

    const { genersList } = useContext(GenersContext)

    if (overview) overview = cutText(overview, 12)

    if (releaseDate) releaseDate = translateDate(releaseDate)

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
        <div
          className={
            showDescription
              ? 'content-description content-description_show'
              : 'content-description content-description_hide'
          }
        >
          <div className='content-description__arrow'></div>
          <div className='content-description__description'>
            <h4 className='content-description__name'>{name}</h4>
            <p className='content-description__release-date'>
              {releaseDate} г.
            </p>
            <p className='content-description__overview'>{overview}</p>
            <div className='content-description__geners'>
              {`Жанры: `}
              {geners.map((gener, index) => (
                <span className='content-description__gener' key={index}>
                  {`${gener} `}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  },
)

export default ProfileContentCard
