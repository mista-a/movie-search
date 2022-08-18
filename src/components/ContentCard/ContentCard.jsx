import image_placeholder from '../../assets/img/image-placeholder.png'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import cutText from '../../utils/cutText'
import translateDate from '../../utils/translateDate'
import ContentDescription from './ContentDescription/ContentDescription'
// import ContentOptions from './ContentOptions/ContentOptions'
import useHideAnimation from '../../hooks/useHideAnimation'
import useObserver from '../../hooks/useObserver'
import { themoviedb } from '../../links'
import RateModal from './RateModal/RateModal'

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
    lastElementRef
  ) => {
    const [showDescription, setShowDescription] = useState(false)
    const [mouseEnter, setMouseEnter] = useState(false)
    const [card, setCard] = useState(false)
    const [rateModal, setRateModal] = useState(false)

    const posterRef = useRef()
    const cardRef = useRef()

    const hideDescriptionAnimation = useHideAnimation(
      showDescription,
      setShowDescription,
      300
    )

    // const showRateModal = () => {
    //   setRateModal(true)
    // }

    useEffect(() => {
      const showDescriptionOnMouseEnter = () => {
        setShowDescription(true)
      }

      const hideDescriptionOnMouseLeave = () => {
        hideDescriptionAnimation.hide()
      }

      mouseEnter ? showDescriptionOnMouseEnter() : hideDescriptionOnMouseLeave()
      setTimeout(() => {
        if (mouseEnter) {
          showDescriptionOnMouseEnter()
        }
      }, 300)
      if (!mouseEnter) {
        hideDescriptionOnMouseLeave()
      }
    }, [mouseEnter])

    useObserver(
      posterRef,
      (entrie) => {
        entrie.target.src = entrie.target.dataset.src
      },
      true,
      [card]
    )

    useObserver(cardRef, () => setCard(true), true, [])

    if (overview) overview = cutText(overview, 20)

    if (releaseDate) releaseDate = translateDate(releaseDate)

    return (
      <>
        <div className='content__wrapper' ref={cardRef}>
          <div
            className={card ? 'content-card content-card_show' : 'content-card'}
            ref={lastElementRef ? lastElementRef : null}
            onMouseOver={() => setMouseEnter(true)}
            onMouseLeave={() => setMouseEnter(false)}
          >
            <Link to={`/${titleType}/${titleId}`}>
              <img
                className='content-card__img'
                ref={posterRef}
                data-src={`${themoviedb}/t/p/w300_and_h450_bestv2/${poster}`}
                src={image_placeholder}
                alt='card'
              />
            </Link>
            {/* <ContentOptions
              watchList={watchList}
              titleType={titleType}
              titleId={titleId}
              showRateModal={showRateModal}
              mouseCardEntered={mouseEnter}
            /> */}
          </div>
          <ContentDescription
            name={name}
            rating={rating}
            overview={overview}
            genersIds={genersIds}
            releaseDate={releaseDate}
            hideDescription={hideDescriptionAnimation}
            showDescription={showDescription}
            setShowDescription={setShowDescription}
          />
        </div>
        <RateModal
          titleId={titleId}
          titleType={titleType}
          rateModal={rateModal}
          setRateModal={setRateModal}
        />
      </>
    )
  }
)

export default ProfileContentCard
