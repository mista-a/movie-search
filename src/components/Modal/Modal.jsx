import { useEffect, useState } from 'react'

const Modal = ({ active, setActive, children }) => {
  const [anim, setAnim] = useState(true)
  //Все еще зависим
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
