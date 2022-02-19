import image_placeholder from '../../../assets/img/image-placeholder.png'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import cutText from '../../../utils/cutText'
import translateDate from '../../../utils/translateDate'
import ContentDescription from './ContentDescription/ContentDescription'
import ContentOptions from './ContentOptions/ContentOptions'

//fix переделать дату в описании
//fix переделать пустой жанр
//fix сделать анимацию на исчезновения description

const ProfileContentCard = forwardRef(
  (
    {
      titleId,
      poster,
      titleType,
      name,
      overview,
      releaseDate,
      genersIds,
      rating,
    },
    lastElementRef,
  ) => {
    const [showDescription, setShowDescription] = useState(false)

    const showDescriptionOnMouseEnter = () => setShowDescription(true)
    const hideDescriptionOnMouseLeave = () => setShowDescription(false)

    const posterRef = useRef()

    useEffect(() => {
      const imageObserver = new IntersectionObserver(
        (entries, observer) => {
          if (entries[0].isIntersecting) {
            entries[0].target.src = entries[0].target.dataset.src

            observer.unobserve(entries[0].target)
          }
        },
        { rootMargin: '40px' },
      )
      if (posterRef.current) imageObserver.observe(posterRef.current)
    }, [])

    if (overview) overview = cutText(overview, 20)

    if (releaseDate) releaseDate = translateDate(releaseDate)

    return (
      <div className='content__wrapper'>
        <div className='content-card'>
          <Link
            to={`/${titleType}/${titleId}`}
            onMouseEnter={showDescriptionOnMouseEnter}
            onMouseLeave={hideDescriptionOnMouseLeave}
            ref={lastElementRef ? lastElementRef : null}
          >
            <img
              ref={posterRef}
              className='content__card'
              data-src={`https://www.themoviedb.org/t/p/w185_and_h278_multi_faces${poster}`}
              src={image_placeholder}
              alt='card'
            />
          </Link>
          <ContentOptions titleType={titleType} titleId={titleId} />
        </div>
        <ContentDescription
          showDescription={showDescription}
          name={name}
          releaseDate={releaseDate}
          overview={overview}
          rating={rating}
          genersIds={genersIds}
        />
      </div>
    )
  },
)

export default ProfileContentCard
