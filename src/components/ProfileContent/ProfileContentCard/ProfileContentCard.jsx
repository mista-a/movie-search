import image_placeholder from '../../../assets/img/image-placeholder.png'
import { forwardRef, useEffect, memo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const ProfileContentCard = forwardRef(
  ({ id, poster, type, lastElenemt, g }, ref) => {
    const [loaded, setLoaded] = useState(false)
    const loadedRef = useRef()

    //Ебаника анимацию через observer

    useEffect(() => {
      setLoaded(false)
      setTimeout(() => {
        if (
          loadedRef.current !== undefined &&
          loadedRef.current !== null &&
          loadedRef.current.complete === true
        ) {
          setLoaded(true)
        }
      }, 1)
    }, [g])

    return (
      <Link to={`/${type}/${id}`}>
        <img
          ref={lastElenemt ? ref : undefined}
          onLoad={() => {
            setLoaded(true)
          }}
          src={`https://www.themoviedb.org/t/p/w185_and_h278_multi_faces${poster}`}
          alt='card'
          className={
            loaded
              ? 'content__card content__card__show'
              : 'content__card content__card__hide'
          }
        />
        {!loaded && (
          <img
            ref={loadedRef}
            src={image_placeholder}
            alt='card'
            className={'content__card content__card__show'}
          />
        )}
      </Link>
    )
  },
)

export default ProfileContentCard
