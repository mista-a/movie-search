import image_placeholder from '../../../assets/img/image-placeholder.png'
import {
  forwardRef,
  useEffect,
  memo,
  useRef,
  useState,
  useCallback,
} from 'react'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const ProfileContentCard = forwardRef(({ id, poster, type, g }, ref) => {
  const [loaded, setLoaded] = useState(false)
  const [visible, setVisible] = useState(false)
  const loadedRef = useRef()
  const observer = useRef()

  const visibleRef = useCallback(
    (element) => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true)
        }
      })
      if (element) observer.current.observe(element)
    },
    [g],
  )

  //Ебаника анимацию через observer

  // useEffect(() => {
  //   setLoaded(false)
  //   setTimeout(() => {
  //     if (
  //       loadedRef.current !== undefined &&
  //       loadedRef.current !== null &&
  //       loadedRef.current.complete === true
  //     ) {
  //       setLoaded(true)
  //     }
  //   }, 1)
  // }, [g])

  return (
    <Link to={`/${type}/${id}`}>
      <img
        ref={visibleRef}
        ref={ref ? ref : null}
        onLoad={() => {
          setVisible(true)
        }}
        src={`https://www.themoviedb.org/t/p/w185_and_h278_multi_faces${poster}`}
        alt='card'
        className={
          visible
            ? 'content__card content__card__show'
            : 'content__card content__card__hide'
        }
      />
      {!loaded && (
        <img
          ref={loadedRef}
          src={image_placeholder}
          alt='card'
          className={'content__card content__card__show'}
        />
      )}
    </Link>
  )
})

export default ProfileContentCard
