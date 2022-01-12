import image_placeholder from '../../../assets/img/image-placeholder.png'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ProfileContentCard = ({ item }) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(false)
  }, [item])

  const showPosters = useCallback(() => {
    setLoaded(true)
  }, [])

  return (
    <Link to={`/movie/${item.id}`}>
      <img
        onLoad={showPosters}
        src={`https://www.themoviedb.org/t/p/w185_and_h278_multi_faces${item.poster_path}`}
        alt='card'
        className={
          loaded
            ? 'content__card__show content__card'
            : 'content__card content__card__hide'
        }
      />
      {!loaded && (
        <img
          src={image_placeholder}
          className='content__card__show content__card__delay content__card'
          alt='card'
        />
      )}
    </Link>
  )
}

export default ProfileContentCard
