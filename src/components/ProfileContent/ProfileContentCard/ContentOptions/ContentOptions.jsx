import { useEffect, useState } from 'react'
import AddToWatchList from './AddToWatchList/AddToWatchList'
import AddToWishList from './AddToWishList/AddToWishList'
import useHideAnimation from '../../../../hooks/useHideAnimation'
import content_options_img from '../../../../assets/img/content-options.svg'

const ContentOptions = ({ titleType, titleId }) => {
  const [showOptions, setShowOptions] = useState(false)

  const switchShowOptions = () => {
    if (showOptions) {
      hideOptionsAnimation.hide()
    } else {
      setShowOptions(true)
    }
  }

  const hideOptionsAnimation = useHideAnimation(
    showOptions,
    setShowOptions,
    400,
  )

  return (
    <div className='content-options'>
      <button
        className='content-options__options-button'
        onClick={switchShowOptions}
      >
        <img
          src={content_options_img}
          alt='добавить'
          className='content-options__img'
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
          <AddToWatchList titleType={titleType} titleId={titleId} />
          <AddToWishList titleType={titleType} titleId={titleId} />
          <div className='content-option content-options__rate'>
            <button className='content-options__button'>
              <span className='content-options__text'>оценить</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContentOptions
