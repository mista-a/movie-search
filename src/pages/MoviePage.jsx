const MoviePage = () => {
  return (
    <section className='movie-page'>
      <img
        src='img/poster.png'
        alt='movie poster'
        className='movie-poster__image'
      />
      <div className='main-description'>
        <span className='movie-name'>
          <h3 className='movie-name__translated'>Бриллиантовая рука</h3>
          <h2 className='movie-name__original'>/ Бриллиантовая рука</h2>
        </span>
        <span className='movie-name__description'>
          <p className='release-date'>2 февраля 1968 г.</p>
          <div className='age-limit-container'>
            <b className='age-limit-container__text'>16+</b>
          </div>
          <span className='geners'>
            <b className='gener-name 1'>приключение &#8226</b>
            <b className='gener-name 2'>комедия &#8226</b>
            <b className='gener-name 3'>боевик</b>
          </span>
        </span>
      </div>
    </section>
  )
}

export default MoviePage
