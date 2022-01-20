import image_placeholder from '../../../assets/img/image-placeholder.png'
import { forwardRef, useState } from 'react'
import { Link } from 'react-router-dom'

const ProfileContentCard = forwardRef(({ id, poster, type }, ref) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <Link to={`/${type}/${id}`}>
      <img
        ref={ref ? ref : null}
        onLoad={() => setLoaded(true)}
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
          src={image_placeholder}
          alt='card'
          className={'content__card content__card__show'}
        />
      )}
    </Link>
  )
})

export default ProfileContentCard
