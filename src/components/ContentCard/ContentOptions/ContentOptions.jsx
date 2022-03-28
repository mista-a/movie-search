import { useState, useEffect } from 'react'
import AddToWatchList from './AddToWatchList/AddToWatchList'
import AddToWishList from './AddToWishList/AddToWishList'
import useHideAnimation from '../../../hooks/useHideAnimation'
import content_options_img from '../../../assets/img/content-options.png'
import RateTitle from './RateTitle/RateTitle'

const ContentOptions = ({
  titleType,
  titleId,
  showRateModal,
  mouseCardEntered,
}) => {
  const [showOptions, setShowOptions] = useState(false)

  const hideOptionsAnimation = useHideAnimation(
    showOptions,
    setShowOptions,
    400,
  )

  useEffect(() => {
    if (!mouseCardEntered) hideOptionsAnimation.hide()
  }, [mouseCardEntered])

  const switchShowOptions = () => {
    showOptions ? hideOptionsAnimation.hide() : setShowOptions(true)
  }

  return (
    <div className='content-options'>
      <button
        className={
          showOptions && !hideOptionsAnimation.hideAnimation
            ? 'content-options__options-button content-options__options-button_active'
            : 'content-options__options-button'
        }
        onClick={switchShowOptions}
      >
        <img
          className='content-options__img'
          src={content_options_img}
          alt='добавить'
        />
      </button>
      {showOptions && (
        <div
          className={
            hideOptionsAnimation.hideAnimation
              ? 'content-options__options content-options__options_hide'
              : 'content-options__options content-options__options_show'
          }
        >
          <AddToWatchList
            titleType={titleType}
            titleId={titleId}
            showRateModal={showRateModal}
          />
          <AddToWishList titleType={titleType} titleId={titleId} />
          <RateTitle />
        </div>
      )}
    </div>
  )
}

export default ContentOptions
