import { useState } from 'react'
import play_image from '../../../../assets/img/play-image.svg'
import Modal from '../../../common/Modal/Modal'
import { useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { titleAPI } from '../../../../API/API'
import { LanguageContext } from '../../../../contexts/LanguageContext'

const Trailer = () => {
  const [trailerModalActive, setTrailerModalActive] = useState(false)
  const [trailers, setTrailers] = useState({
    results: [{ key: 'VCMaJLwChfs' }],
  })

  const { titleType, titleId } = useParams()

  const language = useContext(LanguageContext)

  const toggleModalActive = () => setTrailerModalActive(!trailerModalActive)

  useEffect(() => {
    const getTrailers = async (titleType, titleId, language) => {
      //   setLoaded(false)
      const trailers = await titleAPI.getTrailers(titleType, titleId, language)
      setTrailers(trailers)
      //   setLoaded(true)
    }

    getTrailers(titleType, titleId, language.language)
  }, [language])

  return (
    <div className='trailer'>
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
      )
      {trailers.results.length && (
        <Modal active={trailerModalActive} setActive={setTrailerModalActive}>
          <iframe
            className='trailer-modal'
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
}

export default Trailer
