import { useEffect, useState } from 'react'

const Modal = ({ active, setActive, children }) => {
  //fix Все еще зависим
  //fix классы норм пропиши а то тя пацаны не поймут
  //fix спиздить анимацию с https://mustapp.com/@pochemoo0/watched
  const [anim, setAnim] = useState(true)
  useEffect(() => setAnim(true), [active])

  const hideModal = () => {
    setAnim(false)
    setTimeout(() => setActive(false), 450)
  }

  return (
    active && (
      <div className={anim ? 'modal' : 'hide'} onClick={hideModal}>
        <div className={'modal__content'} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    )
  )
}

export default Modal
