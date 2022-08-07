import preloaderIcon from './../../../assets/img/preloader.svg'

const Preloader = ({ preloaderClass, preloaderImgClass }) => {
  return (
    <div className={preloaderClass}>
      <img className={preloaderImgClass} src={preloaderIcon} alt='loading...' />
    </div>
  )
}

export default Preloader
