import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { titleAPI } from '../../../API/API'
import play_image from '../../../assets/img/play-image.svg'
import Modal from '../../../components/common/Modal/Modal'
import { LanguageContext } from '../../../contexts/LanguageContext'
import { themoviedb } from '../../../links'

const TitlePageLeftDescription = ({ posterPath }) => {
  const [trailerModalActive, setTrailerModalActive] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [trailers, setTrailers] = useState({
    results: [{ key: 'VCMaJLwChfs' }],
  })

  const language = useContext(LanguageContext)

  const { titleType, titleId } = useParams()

  const toggleModalActive = () => setTrailerModalActive(!trailerModalActive)

  useEffect(() => {
    const getTrailers = async (titleType, titleId, language) => {
      setLoaded(false)
      const trailers = await titleAPI.getTrailers(titleType, titleId, language)
      setTrailers(trailers)
      setLoaded(true)
    }

    getTrailers(titleType, titleId, language.language)
  }, [language])

  return (
    loaded && (
      <div className='left-description'>
        <div className='left-description__title-poster'>
          <img
            src={`${themoviedb}/t/p/w600_and_h900_bestv2${posterPath}`}
            alt='title poster'
            className='title-poster__image'
          />
        </div>
        <button
          className={
            trailers.results.length
              ? 'trailer-button'
              : 'trailer-button__disabled'
          }
          onClick={toggleModalActive}
        >
          <img
            src={play_image}
            alt='play image'
            className='trailer-button__play-image'
          />
          <span className='trailer-button__text'>Смотреть трейллер</span>
        </button>
        {trailers.results.length && (
          <Modal active={trailerModalActive} setActive={setTrailerModalActive}>
            <iframe
              className='trailer'
              src={`https://www.youtube.com/embed/${trailers.results[0].key}?&autoplay=1`}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;'
              allowFullScreen
            ></iframe>
          </Modal>
        )}
        <p className='trailer-button-subscribe'>
          *трейлер может отсутствовать :(
        </p>
      </div>
    )
  )
}

export default TitlePageLeftDescription
