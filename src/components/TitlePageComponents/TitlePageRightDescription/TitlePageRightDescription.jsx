import enable_rating_star from '../../../assets/img/enable-rating-star.png'
import disable_rating_star from '../../../assets/img/disable-rating-star.svg'

//fix доделать звездочки

const TitlePageRightDescription = ({ vote_average, credits }) => {
  const showStarsRating = (starsCounter) => {
    const enableStarsCounter = Math.floor(starsCounter / 2)
    return (
      <div className='star-rating'>
        {[...Array(enableStarsCounter)].map((star, index) => {
          return (
            <img
              className='star-rating__enable-star'
              key={index}
              src={enable_rating_star}
              alt='enable star'
            />
          )
        })}
        {[...Array(5 - enableStarsCounter)].map((star, index) => {
          return (
            <img
              className='star-rating__disable-star'
              key={index}
              src={disable_rating_star}
              alt='disable star'
            />
          )
        })}
      </div>
    )
  }

  const getDirector = () => {
    if (credits.crew.length) {
      let ind = 0
      credits.crew.forEach((person, index) => {
        if (person.job === 'Director') ind = index
      })
      return credits.crew[ind].name
    }
  }

  return (
    <div className='right-description'>
      <div className='rating'>
        <span className='rating__rating-mark'>{vote_average}</span>
        <span className='rating__max-rating'>/10</span>
        {showStarsRating(vote_average)}
      </div>
      <div className='right-description__director'>
        <p className='director'>Режиссер</p>
        <p className='director__name'>{getDirector()}</p>
      </div>
    </div>
  )
}

export default TitlePageRightDescription
