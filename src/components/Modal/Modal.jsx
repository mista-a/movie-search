import { useEffect, useState } from 'react'
import useHideAnimation from '../../hooks/useHideAnimation'

const Modal = ({ active, setActive, children }) => {
  const { anim, hide } = useHideAnimation(active, setActive, 450)
  //fix Все еще зависим
  //fix спиздить анимацию с https://mustapp.com/@pochemoo0/watched
  // const [anim, setAnim] = useState(true)
  // useEffect(() => setAnim(true), [active])

  // const hideModal = () => {
  //   setAnim(false)
  //   setTimeout(() => setActive(false), 450)
  // }

  return (
    active && (
      <div className={anim ? 'modal' : 'modal modal_hide'} onClick={hide}>
        <div className={'modal__content'} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    )
  )
}

export default Modal
