import useHideAnimation from '../../../hooks/useHideAnimation'

const Modal = ({ active, setActive, children }) => {
  const hideModalAnimation = useHideAnimation(active, setActive, 500)

  return (
    active && (
      <div
        className={
          hideModalAnimation.hideAnimation
            ? 'modal-wrapper_hide'
            : 'modal-wrapper'
        }
      >
        <div
          className={
            hideModalAnimation.hideAnimation ? 'modal modal_hide' : 'modal'
          }
          onClick={hideModalAnimation.hide}
        >
          <div
            className={'modal__content'}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      </div>
    )
  )
}

export default Modal
