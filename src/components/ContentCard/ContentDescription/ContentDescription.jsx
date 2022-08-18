import { useContext } from 'react'
import { GenersContext } from '../../../contexts/GenersContext'
// import useHideAnimation from '../../../hooks/useHideAnimation'
import contentDescriptionArrow from '../../../assets/img/content-description-arrow.png'

const ContentDescription = ({
  showDescription,
  hideDescription,
  name,
  releaseDate,
  overview,
  rating,
  genersIds,
}) => {
  const { genersList } = useContext(GenersContext)

  // const hideDescriptionAnimation = useHideAnimation()

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
    showDescription && (
      <div
        className={`content-description
          ${
            hideDescription.hideAnimation
              ? 'content-description_hide'
              : 'content-description_show'
          }
            `}
      >
        {/* <img
          className='content-description__arrow'
          src={contentDescriptionArrow}
          alt=''
        /> */}
        <div className='content-description__description'>
          <h4 className='content-description__name'>{name}</h4>
          <p className='content-description__release-date'>{releaseDate}</p>
          <p className='content-description__overview'>{overview}</p>
          {geners.length ? (
            <div className='content-description__geners'>
              {`Жанры: `}
              {geners.map((gener, index) => (
                <span className='content-description__gener' key={index}>
                  {`${gener} `}
                </span>
              ))}
            </div>
          ) : (
            <></>
          )}
          <div className='content-description-rating content-description__rating'>
            {`Оценка: `}
            <span className='content-description-rating__text'>{rating}</span>
          </div>
        </div>
      </div>
    )
  )
}

export default ContentDescription
