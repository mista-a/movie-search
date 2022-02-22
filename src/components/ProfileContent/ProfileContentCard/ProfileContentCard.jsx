import image_placeholder from '../../../assets/img/image-placeholder.png'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import cutText from '../../../utils/cutText'
import translateDate from '../../../utils/translateDate'
import ContentDescription from './ContentDescription/ContentDescription'
import ContentOptions from './ContentOptions/ContentOptions'
import useHideAnimation from '../../../hooks/useHideAnimation'

//fix переделать дату в описании
//fix переделать пустой жанр
//fix сделать анимацию на исчезновения description либо удалить ее к хуям

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
      watchList,
    },
    lastElementRef,
  ) => {
    const [showDescription, setShowDescription] = useState(false)
    const [mouseEnter, setMouseEnter] = useState(false)

    const hideDescriptionAnimation = useHideAnimation(
      showDescription,
      setShowDescription,
      400,
    )

    useEffect(() => {
      setTimeout(() => {
        if (mouseEnter) {
          showDescriptionOnMouseEnter()
        }
      }, 400)
      if (!mouseEnter) {
        hideDescriptionOnMouseLeave()
      }
    }, [mouseEnter])

    const showDescriptionOnMouseEnter = () => {
      setShowDescription(true)
    }

    const hideDescriptionOnMouseLeave = () => {
      hideDescriptionAnimation.hide()
    }

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
      <div
        className='content__wrapper'
        onMouseEnter={() => setMouseEnter(true)}
        onMouseLeave={() => setMouseEnter(false)}
        ref={lastElementRef ? lastElementRef : null}
      >
        <div className='content-card'>
          <Link to={`/${titleType}/${titleId}`}>
            <img
              ref={posterRef}
              className='content__card'
              data-src={`https://www.themoviedb.org/t/p/w185_and_h278_multi_faces${poster}`}
              src={image_placeholder}
              alt='card'
            />
          </Link>
          <ContentOptions
            watchList={watchList}
            titleType={titleType}
            titleId={titleId}
          />
        </div>
        {showDescription && (
          <div
            className={
              hideDescriptionAnimation.hideAnimation
                ? 'content-description content-description_hide'
                : 'content-description content-description_show'
            }
          >
            <ContentDescription
              showDescription={showDescription}
              setShowDescription={setShowDescription}
              name={name}
              releaseDate={releaseDate}
              overview={overview}
              rating={rating}
              genersIds={genersIds}
            />
          </div>
        )}
      </div>
    )
  },
)

export default ProfileContentCard
