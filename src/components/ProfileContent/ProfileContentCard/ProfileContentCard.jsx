import image_placeholder from '../../../assets/img/image-placeholder.png'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import cutText from '../../../utils/cutText'
import translateDate from '../../../utils/translateDate'
import ContentDescription from './ContentDescription/ContentDescription'
import ContentOptions from './ContentOptions/ContentOptions'
import useHideAnimation from '../../../hooks/useHideAnimation'
import useObserver from '../../../hooks/useObserver'
import { themoviedb } from '../../../links'

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
    const [card, setCard] = useState(false)
    const [posterLoaded, setPosterloaded] = useState(false)

    const posterRef = useRef()
    const cardRef = useRef()

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

    useObserver(
      posterRef,
      (entrie) => {
        setPosterloaded(true)
        entrie.target.src = entrie.target.dataset.src
      },
      true,
      [card],
      { rootMargin: '60px' },
    )

    useObserver(cardRef, () => setCard(true), true, [])

    if (overview) overview = cutText(overview, 20)

    if (releaseDate) releaseDate = translateDate(releaseDate)

    //fix posterLoaded style

    return (
      <div
        className='content__wrapper'
        onMouseEnter={() => setMouseEnter(true)}
        onMouseLeave={() => setMouseEnter(false)}
        ref={cardRef}
      >
        <div
          className={card ? 'content-card content-card_show' : 'content-card'}
          ref={lastElementRef ? lastElementRef : null}
        >
          <>
            <Link to={`/${titleType}/${titleId}`}>
              <img
                className='content-card__img'
                ref={posterRef}
                data-src={`${themoviedb}/t/p/w185_and_h278_multi_faces${poster}`}
                src={image_placeholder}
                alt='card'
              />
              {!posterLoaded && (
                <div style={{ position: 'absolute' }}>{name}</div>
              )}
            </Link>
            <ContentOptions
              watchList={watchList}
              titleType={titleType}
              titleId={titleId}
            />
          </>
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
