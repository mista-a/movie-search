import { useContext } from 'react'
import { GenersContext } from '../../../../contexts/GenersContext'

const ContentDescription = ({
  showDescription,
  name,
  releaseDate,
  overview,
  rating,
  genersIds,
}) => {
  const { genersList } = useContext(GenersContext)

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
    <div
      className={
        showDescription
          ? 'content-description content-description_show'
          : 'content-description'
      }
    >
      <div className='content-description__arrow'></div>
      <div className='content-description__description'>
        <h4 className='content-description__name'>{name}</h4>
        <p className='content-description__release-date'>{releaseDate} г.</p>
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
}

export default ContentDescription
