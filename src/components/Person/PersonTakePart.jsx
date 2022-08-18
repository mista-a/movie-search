import React from 'react'
import { Link } from 'react-router-dom'

const PersonTakePart = ({ cast }) => {
  return (
    <div className='person-take-part'>
      <h2 className='person-take-part__text'>Принимал участие в</h2>
      <div className='person-titles'>
        {cast.map(
          ({
            id,
            character,
            title,
            vote_average,
            vote_count,
            release_date,
            media_type,
          }) =>
            title &&
            character && (
              <Link
                className='person-title'
                to={`/${media_type}/${id}`}
                key={id}
              >
                <div className='title-header'>
                  <span className='title-header__name'>{title}</span>
                  <span className='title-header__date'>
                    {release_date?.slice(0, 4)}
                  </span>
                </div>
                <div className='title-subheader'>
                  <span className='title-subheader__character'>
                    {character}
                  </span>
                  <div className='title-subheader__rating'>
                    <span className='title-subheader__rating-mark'>
                      {vote_average?.toFixed(1)}
                    </span>
                    <span className='title-subheader__rating-vote'>
                      {vote_count}
                    </span>
                  </div>
                </div>
              </Link>
            )
        )}
      </div>
    </div>
  )
}

export default PersonTakePart
