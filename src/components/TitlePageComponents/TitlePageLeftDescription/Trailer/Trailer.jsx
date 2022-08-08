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
      const trailers = await titleAPI.getTrailers(titleType, titleId, language)
      setTrailers(trailers)
    }

    getTrailers(titleType, titleId, language.language)
  }, [language, titleId, titleType])

  if (!trailers.results.length)
    return <p className='trailer-undefiend'>Трейлер отсутсвует =(</p>

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
          className='trailer-button__play-image'
          src={play_image}
          alt='play'
        />
        <span className='trailer-button__text'>Смотреть трейлер</span>
      </button>
      {trailers.results.length && (
        <Modal active={trailerModalActive} setActive={setTrailerModalActive}>
          <iframe
            className='trailer-modal'
            title='trailer'
            src={`https://www.youtube.com/embed/${trailers.results[0].key}?&autoplay=1`}
            allow='accelerometer; autoplay; clipboard-wriАte; encrypted-media; gyroscope;'
            allowFullScreen
          />
        </Modal>
      )}
    </div>
  )
}

export default Trailer
