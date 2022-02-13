import image_placeholder from '../../../assets/img/image-placeholder.png'
import { forwardRef, useState } from 'react'
import { Link } from 'react-router-dom'

//fix не забыть перенести cutText в utilits? и определится с написанием

const ProfileContentCard = forwardRef(
  ({ id, poster, type, name, overview }, ref) => {
    const [loaded, setLoaded] = useState(false)

    const cutText = (text, size) => {
      // splitedText = text.split(' ')
      // firstWords = text.slice(0, size)
      // text = text.join(' ')
      // text = `${text}...`
      return `${text.split(' ').slice(0, size).join(' ')}...`
    }

    if (overview) overview = cutText(overview, 10)

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
        <div className='content-description'>
          <div className='content-description__arrow'></div>
          <div className='content-description__description'>
            <h4 className='content-description__name'>{name}</h4>
            <p className='content-description__overview'>{overview}</p>
          </div>
        </div>
      </div>
    )
  },
)

export default ProfileContentCard
