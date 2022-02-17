import image_placeholder from '../../../assets/img/image-placeholder.png'
import { forwardRef, useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import cutText from '../../../utils/cutText'
import translateDate from '../../../utils/translateDate'
import content_options from '../../../assets/img/content-options.svg'
import AddToWatchList from './AddToWatchList/AddToWatchList'
import AddToWishList from './AddToWishList/AddToWishList'
import ContentDescription from './ContentDesription/ContentDescription'

//fix переделать дату в описании
//fix переделать пустой жанр
//fix сделать анимацию на исчезновения description
//fix везде id заменить на movie id

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
    const [showOptions, setShowOptions] = useState(false)

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

    const switchShowDescription = () => setShowDescription(!showDescription)

    const switchShowOptions = () => setShowOptions(!showOptions)

    if (overview) overview = cutText(overview, 20)

    if (releaseDate) releaseDate = translateDate(releaseDate)

    return (
      <div className='content__wrapper'>
        <div className='content-card'>
          <Link
            to={`/${titleType}/${titleId}`}
            onMouseEnter={switchShowDescription}
            onMouseLeave={switchShowDescription}
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
          <div className='content-options'>
            <button
              className='content-options__options-button'
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
              <AddToWatchList titleType={titleType} titleId={titleId} />
              <AddToWishList titleType={titleType} titleId={titleId} />
              <div className='content-option content-options__rate'>
                <button className='content-options__button'>
                  <span className='content-options__text'>оценить</span>
                </button>
              </div>
            </div>
          </div>
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
